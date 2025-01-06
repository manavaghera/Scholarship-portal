// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiRoleManagement {
    address public admin;
    uint public nextUserId;

    mapping(address => User) public users;

    struct User {
        uint id;
        string name;
        uint role; // 1: Student, 2: Donor, etc.
        bool active;
    }

    event UserRegistered(address indexed user, uint id, string name, uint role);
    event UserUpdated(address indexed user, string name, uint role, bool active);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        nextUserId = 1;
    }

    function registerUser(address userAddress, string memory name, uint role) external onlyAdmin {
        require(users[userAddress].id == 0, "User already registered");
        users[userAddress] = User(nextUserId, name, role, true);
        emit UserRegistered(userAddress, nextUserId, name, role);
        nextUserId++;
    }

    function updateUser(address userAddress, string memory name, uint role, bool active) external onlyAdmin {
        require(users[userAddress].id != 0, "User not found");
        users[userAddress].name = name;
        users[userAddress].role = role;
        users[userAddress].active = active;
        emit UserUpdated(userAddress, name, role, active);
    }

    function getUser(address userAddress) external view returns (uint, string memory, uint, bool) {
        User memory user = users[userAddress];
        return (user.id, user.name, user.role, user.active);
    }
}