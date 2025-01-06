// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScholarshipGranting {
    address public admin;
    uint public scholarshipAmount;

    mapping(address => bool) public students;
    mapping(address => bool) public receivedScholarship;

    event ScholarshipDeposited(uint amount);
    event ScholarshipGranted(address student, uint amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender], "Only registered students can receive scholarships");
        _;
    }

    constructor(uint _scholarshipAmount) {
        admin = msg.sender;
        scholarshipAmount = _scholarshipAmount;
    }

    function registerStudent(address student) external onlyAdmin {
        students[student] = true;
    }

    function grantScholarship(address student) external onlyAdmin {
        require(students[student], "Student not registered");
        require(!receivedScholarship[student], "Scholarship already granted");

        payable(student).transfer(scholarshipAmount);
        receivedScholarship[student] = true;
        emit ScholarshipGranted(student, scholarshipAmount);
    }

    function checkScholarshipStatus(address student) external view returns (bool) {
        return receivedScholarship[student];
    }
}
