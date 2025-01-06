const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScholarshipGranting Contract", function () {
  let ScholarshipGranting;
  let scholarshipGranting;
  let admin;
  let student;
  let nonStudent;

  const scholarshipAmount = ethers.utils.parseEther("1"); // 1 ETH

  beforeEach(async function () {
    // Get the signers
    [admin, student, nonStudent] = await ethers.getSigners();

    // Deploy the contract
    const ScholarshipGrantingFactory = await ethers.getContractFactory("ScholarshipGranting");
    scholarshipGranting = await ScholarshipGrantingFactory.deploy(scholarshipAmount);
  });

  describe("Deployment", function () {
    it("should set the admin correctly", async function () {
      expect(await scholarshipGranting.admin()).to.equal(admin.address);
    });

    it("should set the scholarship amount correctly", async function () {
      expect(await scholarshipGranting.scholarshipAmount()).to.equal(scholarshipAmount);
    });
  });

  describe("Registering Students", function () {
    it("should allow the admin to register a student", async function () {
      await scholarshipGranting.registerStudent(student.address);

      const isStudent = await scholarshipGranting.students(student.address);
      expect(isStudent).to.equal(true);
    });

    it("should not allow non-admin to register a student", async function () {
      await expect(
        scholarshipGranting.connect(nonStudent).registerStudent(student.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow a student to register themselves", async function () {
      await expect(
        scholarshipGranting.registerStudent(student.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Granting Scholarships", function () {
    beforeEach(async function () {
      await scholarshipGranting.registerStudent(student.address);
    });

    it("should allow the admin to grant scholarship to a registered student", async function () {
      const initialBalance = await student.getBalance();
      
      await scholarshipGranting.grantScholarship(student.address);

      const finalBalance = await student.getBalance();
      expect(finalBalance.sub(initialBalance)).to.equal(scholarshipAmount);

      const isScholarshipReceived = await scholarshipGranting.checkScholarshipStatus(student.address);
      expect(isScholarshipReceived).to.equal(true);
    });

    it("should not allow non-admin to grant scholarship", async function () {
      await expect(
        scholarshipGranting.connect(nonStudent).grantScholarship(student.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow granting scholarship to a student who has already received it", async function () {
      await scholarshipGranting.grantScholarship(student.address);

      await expect(
        scholarshipGranting.grantScholarship(student.address)
      ).to.be.revertedWith("Scholarship already granted");
    });

    it("should revert if the student is not registered", async function () {
      await expect(
        scholarshipGranting.grantScholarship(nonStudent.address)
      ).to.be.revertedWith("Student not registered");
    });
  });

  describe("Checking Scholarship Status", function () {
    it("should return the correct scholarship status for a student", async function () {
      await scholarshipGranting.registerStudent(student.address);

      const statusBeforeGranting = await scholarshipGranting.checkScholarshipStatus(student.address);
      expect(statusBeforeGranting).to.equal(false);

      await scholarshipGranting.grantScholarship(student.address);

      const statusAfterGranting = await scholarshipGranting.checkScholarshipStatus(student.address);
      expect(statusAfterGranting).to.equal(true);
    });
  });
});