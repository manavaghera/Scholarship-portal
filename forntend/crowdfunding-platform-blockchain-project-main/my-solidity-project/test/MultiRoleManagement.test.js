const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiRoleManagement Contract", function () {
  let MultiRoleManagement;
  let multiRoleManagement;
  let admin;
  let user1;
  let user2;
  let nonAdmin;

  const roleStudent = 1;
  const roleDonor = 2;

  beforeEach(async function () {
    // Get the signers
    [admin, user1, user2, nonAdmin] = await ethers.getSigners();

    // Deploy the contract
    const MultiRoleManagementFactory = await ethers.getContractFactory("MultiRoleManagement");
    multiRoleManagement = await MultiRoleManagementFactory.deploy();
  });

  describe("Deployment", function () {
    it("should set the admin correctly", async function () {
      expect(await multiRoleManagement.admin()).to.equal(admin.address);
    });

    it("should initialize the nextUserId correctly", async function () {
      expect(await multiRoleManagement.nextUserId()).to.equal(1);
    });
  });

  describe("Registering Users", function () {
    it("should allow the admin to register a user", async function () {
      await multiRoleManagement.registerUser(user1.address, "User 1", roleStudent);

      const user = await multiRoleManagement.users(user1.address);
      expect(user.id).to.equal(1);
      expect(user.name).to.equal("User 1");
      expect(user.role).to.equal(roleStudent);
      expect(user.active).to.equal(true);
    });

    it("should emit a UserRegistered event when a user is registered", async function () {
      await expect(
        multiRoleManagement.registerUser(user1.address, "User 1", roleStudent)
      )
        .to.emit(multiRoleManagement, "UserRegistered")
        .withArgs(user1.address, 1, "User 1", roleStudent);
    });

    it("should not allow non-admin to register a user", async function () {
      await expect(
        multiRoleManagement.connect(nonAdmin).registerUser(user1.address, "User 1", roleStudent)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow registering a user twice", async function () {
      await multiRoleManagement.registerUser(user1.address, "User 1", roleStudent);

      await expect(
        multiRoleManagement.registerUser(user1.address, "User 1", roleStudent)
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Updating Users", function () {
    beforeEach(async function () {
      await multiRoleManagement.registerUser(user1.address, "User 1", roleStudent);
    });

    it("should allow the admin to update a user's details", async function () {
      await multiRoleManagement.updateUser(user1.address, "Updated User 1", roleDonor, false);

      const user = await multiRoleManagement.users(user1.address);
      expect(user.name).to.equal("Updated User 1");
      expect(user.role).to.equal(roleDonor);
      expect(user.active).to.equal(false);
    });

    it("should emit a UserUpdated event when a user is updated", async function () {
      await expect(
        multiRoleManagement.updateUser(user1.address, "Updated User 1", roleDonor, false)
      )
        .to.emit(multiRoleManagement, "UserUpdated")
        .withArgs(user1.address, "Updated User 1", roleDonor, false);
    });

    it("should not allow non-admin to update a user", async function () {
      await expect(
        multiRoleManagement.connect(nonAdmin).updateUser(user1.address, "Updated User 1", roleDonor, false)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow updating a non-existing user", async function () {
      await expect(
        multiRoleManagement.updateUser(user2.address, "Non-existing User", roleStudent, true)
      ).to.be.revertedWith("User not found");
    });
  });

  describe("Fetching User Details", function () {
    beforeEach(async function () {
      await multiRoleManagement.registerUser(user1.address, "User 1", roleStudent);
    });

    it("should allow anyone to fetch user details", async function () {
      const [id, name, role, active] = await multiRoleManagement.getUser(user1.address);
      expect(id).to.equal(1);
      expect(name).to.equal("User 1");
      expect(role).to.equal(roleStudent);
      expect(active).to.equal(true);
    });

    it("should return correct user details", async function () {
      const [id, name, role, active] = await multiRoleManagement.getUser(user1.address);
      expect(id).to.equal(1);
      expect(name).to.equal("User 1");
      expect(role).to.equal(roleStudent);
      expect(active).to.equal(true);
    });
  });
});