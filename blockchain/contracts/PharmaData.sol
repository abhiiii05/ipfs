// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PharmaceuticalData {
    struct DataRecord {
        string ipfsHash;
        string batchId;
        string manufacturer;
        string country;
        uint256 purity;
        uint256 productionDate;
        uint256 expiryDate;
        string gmpId;
        address uploader;
        uint256 timestamp;
        bool isActive;
    }

    mapping(string => DataRecord) public records;
    mapping(address => string[]) public userRecords