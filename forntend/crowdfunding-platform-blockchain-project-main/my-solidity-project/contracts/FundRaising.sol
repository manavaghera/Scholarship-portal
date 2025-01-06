// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fundraising {
    address public admin;
    uint public fundraisingGoal;
    uint public totalDonations;
    
    mapping(address => uint) public donations;

    event FundReceived(address donor, uint amount);
    event FundsWithdrawn(address admin, uint amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(uint _fundraisingGoal) {
        admin = msg.sender;
        fundraisingGoal = _fundraisingGoal;
    }

    function donate() external payable {
        require(totalDonations < fundraisingGoal, "Fundraising goal reached");
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        emit FundReceived(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyAdmin {
        require(totalDonations >= fundraisingGoal, "Fundraising goal not reached");
        uint amount = totalDonations;
        totalDonations = 0;
        payable(admin).transfer(amount);
        emit FundsWithdrawn(admin, amount);
    }

    function getTotalDonations() external view returns (uint) {
        return totalDonations;
    }
}