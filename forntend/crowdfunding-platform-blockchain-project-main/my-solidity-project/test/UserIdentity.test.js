const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserIdentity Contract", function () {
  let UserIdentity;
  let userIdentity;
  let admin;
  let user1;
  let user2;

  const userName1 = "Alice";
  const userName2 = "Bob";
  const userRole1 = 1; // Student
  const userRole2 = 2; // Donor

  beforeEach(async function () {
    // Get the signers
    [admin, user1, user2] = await ethers.getSigners();

    // Deploy the contract
    const UserIdentityFactory = await ethers.getContractFactory("UserIdentity");
    userIdentity = await UserIdentityFactory.deploy();
  });

  describe("Deployment", function () {
    it("should set the admin correctly", async function () {
      expect(await userIdentity.admin()).to.equal(admin.address);
    });

    it("should initialize nextUserId to 1", async function () {
      expect(await userIdentity.nextUserId()).to.equal(1);
    });
  });

  describe("Registering Users", function () {
    it("should allow the admin to register a user", async function () {
      await userIdentity.registerUser(user1.address, userName1, userRole1);
      const user = await userIdentity.users(user1.address);
      expect(user.id).to.equal(1);
      expect(user.name).to.equal(userName1);
      expect(user.role).to.equal(userRole1);
      expect(user.active).to.equal(true);
    });

    it("should emit a UserRegistered event when a user is registered", async function () {
      await expect(
        userIdentity.registerUser(user1.address, userName1, userRole1)
      )
        .to.emit(userIdentity, "UserRegistered")
        .withArgs(user1.address, 1, userName1, userRole1);
    });

    it("should not allow non-admin to register a user", async function () {
      await expect(
        userIdentity.connect(user2).registerUser(user1.address, userName1, userRole1)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow registering the same user twice", async function () {
      await userIdentity.registerUser(user1.address, userName1, userRole1);
      await expect(
        userIdentity.registerUser(user1.address, userName1, userRole1)
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Updating Users", function () {
    beforeEach(async function () {
      await userIdentity.registerUser(user1.address, userName1, userRole1);
    });

    it("should allow the admin to update a user's information", async function () {
      const newName = "Charlie";
      const newRole = 2; // Donor
      const newActiveStatus = false;
      await userIdentity.updateUser(user1.address, newName, newRole, newActiveStatus);

      const user = await userIdentity.users(user1.address);
      expect(user.name).to.equal(newName);
      expect(user.role).to.equal(newRole);
      expect(user.active).to.equal(newActiveStatus);
    });

    it("should emit a UserUpdated event when a user is updated", async function () {
      const newName = "Charlie";
      const newRole = 2; // Donor
      const newActiveStatus = false;
      await expect(
        userIdentity.updateUser(user1.address, newName, newRole, newActiveStatus)
      )
        .to.emit(userIdentity, "UserUpdated")
        .withArgs(user1.address, newName, newRole, newActiveStatus);
    });

    it("should not allow non-admin to update a user's information", async function () {
      const newName = "Charlie";
      const newRole = 2; // Donor
      const newActiveStatus = false;
      await expect(
        userIdentity.connect(user2).updateUser(user1.address, newName, newRole, newActiveStatus)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should not allow updating a non-registered user", async function () {
      const newName = "Charlie";
      const newRole = 2; // Donor
      const newActiveStatus = false;
      await expect(
        userIdentity.updateUser(user2.address, newName, newRole, newActiveStatus)
      ).to.be.revertedWith("User not found");
    });
  });

  describe("Getting User Information", function () {
    beforeEach(async function () {
      await userIdentity.registerUser(user1.address, userName1, userRole1);
    });

    it("should allow anyone to get a user's information", async function () {
      const [id, name, role, active] = await userIdentity.getUser(user1.address);
      expect(id).to.equal(1);
      expect(name).to.equal(userName1);
      expect(role).to.equal(userRole1);
      expect(active).to.equal(true);
    });

    it("should return correct information for the user", async function () {
      const [id, name, role, active] = await userIdentity.getUser(user1.address);
      expect(id).to.equal(1);
      expect(name).to.equal(userName1);
      expect(role).to.equal(userRole1);
      expect(active).to.equal(true);
    });

    it("should return a non-registered user with default values", async function () {
      const [id, name, role, active] = await userIdentity.getUser(user2.address);
      expect(id).to.equal(0);
      expect(name).to.equal("");
      expect(role).to.equal(0);
      expect(active).to.equal(false);
    });
  });
});