import { ethers } from 'ethers';
import { PHARMA_CONTRACT_ABI, CONTRACT_CONFIG, PharmaceuticalRecord, FormDataForContract, FormDataForContractOfManufacturer ,  FormDataForContractOfRetailer ,dateToTimestamp, FormDataForContractOfProducer } from './contract';

export class BlockchainService {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;
    private signer: ethers.Wallet;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(CONTRACT_CONFIG.network.rpcUrl);
        // This is the private key for Account #0 from Hardhat node
        const defaultPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        this.signer = new ethers.Wallet(defaultPrivateKey, this.provider);
        // Initialize contract instance
        this.contract = new ethers.Contract(
            CONTRACT_CONFIG.address,
            PHARMA_CONTRACT_ABI,
            this.signer
        );
    }

    async storePharmaceuticalData(ipfsHash: string, formData: FormDataForContract): Promise<{ success: boolean; txHash?: string; error?: string }> {
        try {
            console.log('📤 Storing data on blockchain...');
            console.log('IPFS Hash:', ipfsHash);
            console.log('Form Data:', formData);

            // Convert date strings to timestamps
            const productionTimestamp = dateToTimestamp(formData.productionDate);
            const expiryTimestamp = dateToTimestamp(formData.expiryDate);

            // Call smart contract function
            const tx = await this.contract.storeData(
                ipfsHash,
                formData.batchId,
                formData.manufacturer,
                formData.country,
                formData.purity,
                productionTimestamp,
                expiryTimestamp,
                formData.gmpId
            );

            console.log('Transaction sent:', tx.hash);


            const receipt = await tx.wait();
            console.log('✅ Transaction confirmed:', receipt.hash);

            return {
                success: true,
                txHash: receipt.hash
            };

        } catch (error: any) {
            console.error(' Blockchain storage failed:', error);
            return {
                success: false,
                error: error.message || 'Unknown blockchain error'
            };
        }
    }

    async storeRetailerData(ipfsHash: string, formData: FormDataForContractOfRetailer): Promise<{ success: boolean; txHash?: string; error?: string }> {
        try {
            console.log('📤 Storing retailer data on blockchain...');
            console.log('IPFS Hash:', ipfsHash);
            console.log('Form Data:', formData);

            // Call smart contract function
            const tx = await this.contract.storeData(
                ipfsHash,
                formData.batchId,
                formData.retailerId,
                formData.storeName,
                formData.productReceived,
                formData.wholesalerId,
                formData.quantityReceived,
                formData.receivedDate
            );

            console.log('Transaction sent:', tx.hash);

            const receipt = await tx.wait();
            console.log('✅ Transaction confirmed:', receipt.hash);

            return {
                success: true,
                txHash: receipt.hash
            };

        } catch (error: any) {
            console.error('Blockchain storage failed:', error);
            return {
                success: false,
                error: error.message || 'Unknown blockchain error'
            };
        }
    }


    async storeProducerData(ipfsHash: string, formData:FormDataForContractOfProducer): Promise<{ success: boolean; txHash?: string; error?: string }> {
        try {
            console.log('📤 Storing producer data on blockchain...');
            console.log('IPFS Hash:', ipfsHash);
            console.log('Form Data:', formData);

            // Call smart contract function
            const tx = await this.contract.storeData(
                ipfsHash,
                formData.batchId,
                formData.producerId,
                formData.fullName,
                formData.materialType,
                formData.quantity,
                formData.location,
                dateToTimestamp(formData.extractDate)
            );

            console.log('Transaction sent:', tx.hash);

            const receipt = await tx.wait();
            console.log('✅ Transaction confirmed:', receipt.hash);

            return {
                success: true,
                txHash: receipt.hash
            };

        } catch (error: any) {
            console.error('Blockchain storage failed:', error);
            return {
                success: false,
                error: error.message || 'Unknown blockchain error'
            };
        }
    }

    async storeManufacturerData(ipfsHash: string, formData: FormDataForContractOfManufacturer): Promise<{ success: boolean; txHash?: string; error?: string }> {
        try {
            console.log('📤 Storing manufacturer data on blockchain...');
            console.log('IPFS Hash:', ipfsHash);
            console.log('Form Data:', formData);

            // Call smart contract function
            const tx = await this.contract.storeData(
                ipfsHash,
                formData.batchId,
                formData.manufacturerId,
                formData.companyName,
                formData.productName,
                formData.rawMaterialUsed,
                formData.quantityUsed,
                formData.productionDate
            );

            console.log('Transaction sent:', tx.hash);

            const receipt = await tx.wait();
            console.log('✅ Transaction confirmed:', receipt.hash);

            return {
                success: true,
                txHash: receipt.hash
            };

        } catch (error: any) {
            console.error('Blockchain storage failed:', error);
            return {
                success: false,
                error: error.message || 'Unknown blockchain error'
            };
        }
    }

    async getRecord(batchId: string): Promise<{ success: boolean; data?: PharmaceuticalRecord; error?: string }> {
        try {
            console.log('🔍 Fetching record for batch:', batchId);

            const record = await this.contract.getRecord(batchId);

            const pharmaceuticalRecord: PharmaceuticalRecord = {
                ipfsHash: record.ipfsHash,
                batchId: record.batchId,
                manufacturer: record.manufacturer,
                country: record.country,
                purity: Number(record.purity),
                productionDate: Number(record.productionDate),
                expiryDate: Number(record.expiryDate),
                gmpId: record.gmpId,
                uploader: record.uploader,
                timestamp: Number(record.timestamp),
                isActive: record.isActive
            };

            return {
                success: true,
                data: pharmaceuticalRecord
            };

        } catch (error: any) {
            console.error('Failed to fetch record:', error);
            return {
                success: false,
                error: error.message || 'Record not found'
            };
        }
    }

    async getAllBatchIds(): Promise<{ success: boolean; data?: string[]; error?: string }> {
        try {
            console.log('Fetching all batch IDs...');

            const batchIds = await this.contract.getAllBatchIds();

            return {
                success: true,
                data: batchIds
            };

        } catch (error: any) {
            console.error('Failed to fetch batch IDs:', error);
            return {
                success: false,
                error: error.message || 'Failed to fetch batch IDs'
            };
        }
    }

    async getTotalRecords(): Promise<{ success: boolean; count?: number; error?: string }> {
        try {
            const total = await this.contract.getTotalRecords();

            return {
                success: true,
                count: Number(total)
            };

        } catch (error: any) {
            console.error('Failed to get total records:', error);
            return {
                success: false,
                error: error.message || 'Failed to get total records'
            };
        }
    }

    async updateRecord(batchId: string, newIpfsHash: string): Promise<{ success: boolean; txHash?: string; error?: string }> {
        try {
            console.log('Updating record on blockchain...');

            const tx = await this.contract.updateData(batchId, newIpfsHash);
            console.log('Update transaction sent:', tx.hash);

            const receipt = await tx.wait();
            console.log('Update confirmed:', receipt.hash);

            return {
                success: true,
                txHash: receipt.hash
            };

        } catch (error: any) {
            console.error('Failed to update record:', error);
            return {
                success: false,
                error: error.message || 'Failed to update record'
            };
        }
    }

    async isContractAccessible(): Promise<boolean> {
        try {
            await this.contract.getTotalRecords();
            return true;
        } catch (error) {
            console.error('Contract not accessible:', error);
            return false;
        }
    }
}

export const blockchainService = new BlockchainService();

