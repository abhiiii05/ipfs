import {ethers} from 'ethers';

export const PHARMA_CONTRACT_ABI = [
    "event DataStored(string indexed batchId, string ipfsHash, " +
    "string manufacturer, address indexed uploader, uint256 timestamp)",
    "event DataUpdated(string indexed batchId, string newIpfsHash, " +
    "address indexed updater, uint256 timestamp)",

    "function storeData(string memory _ipfsHash, string memory _batchId, string memory _manufacturer, string memory _country, uint256 _purity, uint256 _productionDate, uint256 _expiryDate, string memory _gmpId) external",
    "function updateData(string memory _batchId, string memory _newIpfsHash) external",
    "function getRecord(string memory _batchId) external view returns (tuple(string ipfsHash, string batchId, string manufacturer, string country, uint256 purity, uint256 productionDate, uint256 expiryDate, string gmpId, address uploader, uint256 timestamp, bool isActive))",
    "function getUserRecords(address _user) external view returns (string[] memory)",
    "function getAllBatchIds() external view returns (string[] memory)",
    "function getTotalRecords() external view returns (uint256)",
    "function deactivateRecord(string memory _batchId) external",
    "function reactivateRecord(string memory _batchId) external"
];

export const CONTRACT_CONFIG = {
    //on deployment change PLS!
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",

    network: {
        chainId: 31337, // Hardhat localhost chain ID
        name: "localhost",
        rpcUrl: "http://127.0.0.1:8545"
    }
};

export interface PharmaceuticalRecord{
    ipfsHash: string;
    batchId: string;
    manufacturer: string;
    country: string;
    purity: number;
    productionDate: number;
    expiryDate: number;
    gmpId: string;
    uploader: string;
    timestamp: number;
    isActive: boolean;
}

export interface FormDataForContract{
    api: string;
    batchId: string;
    manufacturer: string;
    country: string;
    purity: number;
    productionDate: string;
    expiryDate: string;
    gmpId: string;
    userEmail: string;
}

export interface FormDataForContractOfRetailer {
    retailerId: string;
    storeName: string;
    productReceived: string;
    wholesalerId: string;
    quantityReceived: number;
    receivedDate: string;
    batchId: string;
    timestamp: string;
}

export interface FormDataForContractOfManufacturer {
    manufacturerId: string;
    companyName: string;
    productName: string;
    rawMaterialUsed: string;
    quantityUsed: string;
    productionDate: string;
    batchId: string;
}

export interface FormDataForContractOfProducer {
    producerId: string;
    fullName: string;
    materialType: string;
    quantity: string;
    location: string;
    extractDate: string;
    batchId?: string;
    timestamp: string;
}

export function dateToTimestamp(dateString : string){
    return Math.floor(new Date(dateString).getTime() / 1000);
}

export function timestampToDate(timestamp : number){
    return new Date(timestamp *1000).toLocaleString();
}