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
    mapping(address => string[]) public userRecords;
    string[] public allBatchIds;

    event DataStored(
            string indexed batchId,
            string ipfsHash,
            string manufacturer,
            address indexed uploader,
            uint256 timestamp
        );

    event DataUpdated(
            string indexed batchId,
            string newIpfsHash,
            address indexed updater,
            uint256 timestamp
        );


    modifier onlyRecordOwner(string memory batchId) {
            require(records[batchId].uploader == msg.sender, "Only record owner can perform this action");
            _;
        }

    modifier recordExists(string memory batchId){
            require(bytes(records[batchId].ipfsHash).length > 0, "Record does not exist");
            _;
        }

    function storeData (string memory _ipfsHash,
                        string memory _batchId,
                        string memory _manufacturer,
                        string memory _country,
                        uint256 _purity,
                        uint256 _productionDate,
                        uint256 _expiryDate,
                        string memory _gmpId) external {
        //VALIDATIONS
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(bytes(_batchId).length > 0, "Batch ID cannot be empty");
        require(bytes(records[_batchId].ipfsHash).length == 0, "Record already exists for this batch ID");
        require(_purity <= 100, "Purity cannot exceed 100%");
        require(_productionDate < _expiryDate, "Production date must be before expiry date");

        records[_batchId] = DataRecord({
            ipfsHash: _ipfsHash,
            batchId: _batchId,
            manufacturer: _manufacturer,
            country: _country,
            purity: _purity,
            productionDate: _productionDate,
            expiryDate: _expiryDate,
            gmpId: _gmpId,
            uploader: msg.sender,
            timestamp: block.timestamp,
            isActive: true
        });

        userRecords[msg.sender].push(_batchId);
        allBatchIds.push(_batchId);

        emit DataStored(_batchId, _ipfsHash, _manufacturer, msg.sender, block.timestamp);
    }

    function updateData( //UPDATED ONLY BY OWNER
        string memory _batchId,
        string memory _newIpfsHash
    ) external onlyRecordOwner(_batchId) recordExists(_batchId) {
        require(bytes(_newIpfsHash).length > 0, "IPFS hash cannot be empty");
        require(records[_batchId].isActive, "Record is not active");

        records[_batchId].ipfsHash = _newIpfsHash;
        records[_batchId].timestamp = block.timestamp;

        emit DataUpdated(_batchId, _newIpfsHash, msg.sender, block.timestamp);
    }

    function getRecord(string memory _batchId) external view returns (DataRecord memory) {
        require(bytes(records[_batchId].ipfsHash).length > 0, "Record does not exist");
        return records[_batchId];
    }

    function getUserRecords(address _user) external view returns (string[] memory) {
        return userRecords[_user];
    }

    function getAllBatchIds() external view returns (string[] memory) {
        return allBatchIds;
    }
    function getTotalRecords() external view returns (uint256) {
        return allBatchIds.length;
    }

    function deactivateRecord(string memory _batchId) external onlyRecordOwner(_batchId) recordExists(_batchId) {
        records[_batchId].isActive = false;
    }

    function reactivateRecord(string memory _batchId) external onlyRecordOwner(_batchId) recordExists(_batchId) {
        records[_batchId].isActive = true;
    }

}