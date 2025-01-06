const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AdminFundManagement Contract", function () {
  let AdminFundManagement;
  let adminFundManagement;
  let admin;
  let user;

  beforeEach(async function () {
    // Get the signers
    [admin, user] = await ethers.getSigners();

    // Deploy the contract
    const AdminFundManagementFactory = await ethers.getContractFactory("AdminFundManagement");
    adminFundManagement = await AdminFundManagementFactory.deploy();
  });

  describe("Deployment", function () {
    it("should set the admin correctly", async function () {
      expect(await adminFundManagement.admin()).to.equal(admin.address);
    });
  });

  describe("Depositing Funds", function () {
    it("should allow the admin to deposit funds", async function () {
      const depositAmount = ethers.utils.parseEther("1"); // 1 ETH
      await adminFundManagement.deposit({ value: depositAmount });

      const balance = await adminFundManagement.getBalance();
      expect(balance).to.equal(depositAmount);
    });

    it("should not allow non-admin to deposit funds", async function () {
      const depositAmount = ethers.utils.parseEther("1"); // 1 ETH

      // Try depositing from a non-admin account
      await expect(
        adminFundManagement.connect(user).deposit({ value: depositAmount })
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Transferring Funds", function () {
    it("should allow the admin to transfer funds", async function () {
      const depositAmount = ethers.utils.parseEther("2"); // 2 ETH
      await adminFundManagement.deposit({ value: depositAmount });

      const initialBalance = await user.getBalance();

      const transferAmount = ethers.utils.parseEther("1"); // 1 ETH
      await adminFundManagement.transfer(user.address, transferAmount);

      const finalBalance = await user.getBalance();
      expect(finalBalance.sub(initialBalance)).to.equal(transferAmount);

      const contractBalance = await adminFundManagement.getBalance();
      expect(contractBalance).to.equal(depositAmount.sub(transferAmount));
    });

    it("should not allow non-admin to transfer funds", async function () {
      const depositAmount = ethers.utils.parseEther("2"); // 2 ETH
      await adminFundManagement.deposit({ value: depositAmount });

      // Try transferring from a non-admin account
      await expect(
        adminFundManagement.connect(user).transfer(user.address, depositAmount)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("should revert if trying to transfer more than contract balance", async function () {
      const depositAmount = ethers.utils.parseEther("1"); // 1 ETH
      await adminFundManagement.deposit({ value: depositAmount });

      const transferAmount = ethers.utils.parseEther("2"); // 2 ETH (more than contract balance)
      await expect(
        adminFundManagement.transfer(user.address, transferAmount)
      ).to.be.revertedWith("Insufficient funds");
    });
  });
});