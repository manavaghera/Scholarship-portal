// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminFundManagement {
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Deposit funds into the contract
    function deposit() external payable onlyAdmin {}

    // Transfer funds to another address
    function transfer(address payable recipient, uint256 amount) external onlyAdmin {
        require(address(this).balance >= amount, "Insufficient funds");
        recipient.transfer(amount);
    }

    // Get contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

