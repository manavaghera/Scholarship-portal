const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fundraising Contract", function () {
  let Fundraising;
  let fundraising;
  let admin;
  let donor1;
  let donor2;
  let donor3;

  const donationAmount1 = ethers.utils.parseEther("1");
  const donationAmount2 = ethers.utils.parseEther("2");

  beforeEach(async function () {
    // Get the signers (admin, donors)
    [admin, donor1, donor2, donor3] = await ethers.getSigners();

    // Deploy the contract
    const FundraisingFactory = await ethers.getContractFactory("Fundraising");
    fundraising = await FundraisingFactory.deploy();
  });

  describe("Deployment", function () {
    it("should set the admin correctly", async function () {
      expect(await fundraising.admin()).to.equal(admin.address);
    });

    it("should initialize the contract with zero balance", async function () {
      expect(await fundraising.getBalance()).to.equal(0);
    });
  });

  describe("Donations", function () {
    it("should allow donors to donate", async function () {
      await fundraising.connect(donor1).donate({ value: donationAmount1 });
      expect(await fundraising.getBalance()).to.equal(donationAmount1);

      await fundraising.connect(donor2).donate({ value: donationAmount2 });
      expect(await fundraising.getBalance()).to.equal(donationAmount1.add(donationAmount2));
    });

    it("should emit a DonationReceived event when a donation is made", async function () {
      await expect(fundraising.connect(donor1).donate({ value: donationAmount1 }))
        .to.emit(fundraising, "DonationReceived")
        .withArgs(donor1.address, donationAmount1);

      await expect(fundraising.connect(donor2).donate({ value: donationAmount2 }))
        .to.emit(fundraising, "DonationReceived")
        .withArgs(donor2.address, donationAmount2);
    });

    it("should allow multiple donors to donate to the contract", async function () {
      await fundraising.connect(donor1).donate({ value: donationAmount1 });
      await fundraising.connect(donor2).donate({ value: donationAmount2 });
      await fundraising.connect(donor3).donate({ value: donationAmount1 });

      expect(await fundraising.getBalance()).to.equal(donationAmount1.add(donationAmount2).add(donationAmount1));
    });

    it("should update the donor's total donation amount correctly", async function () {
      await fundraising.connect(donor1).donate({ value: donationAmount1 });
      await fundraising.connect(donor2).donate({ value: donationAmount2 });

      expect(await fundraising.getTotalDonations(donor1.address)).to.equal(donationAmount1);
      expect(await fundraising.getTotalDonations(donor2.address)).to.equal(donationAmount2);
    });

    it("should not allow donations of zero value", async function () {
      await expect(fundraising.connect(donor1).donate({ value: 0 }))
        .to.be.revertedWith("Donation amount should be greater than zero");
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // Donors donate before withdrawal tests
      await fundraising.connect(donor1).donate({ value: donationAmount1 });
      await fundraising.connect(donor2).donate({ value: donationAmount2 });
    });

    it("should allow admin to withdraw funds", async function () {
      const initialAdminBalance = await ethers.provider.getBalance(admin.address);

      const contractBalance = await fundraising.getBalance();
      await fundraising.connect(admin).withdraw(contractBalance);

      const finalAdminBalance = await ethers.provider.getBalance(admin.address);
      expect(finalAdminBalance).to.be.gt(initialAdminBalance); // Admin balance should increase
      expect(await fundraising.getBalance()).to.equal(0); // Contract balance should be zero
    });

    it("should only allow admin to withdraw funds", async function () {
      await expect(fundraising.connect(donor1).withdraw(donationAmount1))
        .to.be.revertedWith("Only admin can withdraw funds");
    });

    it("should not allow withdrawal of more funds than available", async function () {
      const contractBalance = await fundraising.getBalance();
      await expect(fundraising.connect(admin).withdraw(contractBalance.add(1)))
        .to.be.revertedWith("Insufficient funds");
    });
  });

  describe("Getting Donations", function () {
    beforeEach(async function () {
      // Donors donate before getting donation details
      await fundraising.connect(donor1).donate({ value: donationAmount1 });
      await fundraising.connect(donor2).donate({ value: donationAmount2 });
    });

    it("should allow anyone to check the total donations", async function () {
      const totalDonations = await fundraising.getBalance();
      expect(totalDonations).to.equal(donationAmount1.add(donationAmount2));
    });

    it("should allow anyone to check the total donation of a specific donor", async function () {
      const totalDonations1 = await fundraising.getTotalDonations(donor1.address);
      const totalDonations2 = await fundraising.getTotalDonations(donor2.address);
      
      expect(totalDonations1).to.equal(donationAmount1);
      expect(totalDonations2).to.equal(donationAmount2);
    });
  });
});