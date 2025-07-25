import { expect } from "chai";
import { ethers } from "hardhat";
import { PharmaceuticalData } from "../typechain-types";

describe("PharmaceuticalData", function () {
    let pharmaData: PharmaceuticalData;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy contract
        const PharmaceuticalData = await ethers.getContractFactory("PharmaceuticalData");
        pharmaData = await PharmaceuticalData.deploy();
        await pharmaData.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should deploy successfully", async function () {
            expect(await pharmaData.getTotalRecords()).to.equal(0);
        });
    });

    describe("Store Data", function () {
        it("Should store the pharma details successfully",  async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-001";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60); // 1 year exp
            const gmpId = "GMP-123";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            const record = await pharmaData.getRecord(batchId);
            expect(record.ipfsHash).to.equal(ipfsHash);
            expect(record.batchId).to.equal(batchId);
            expect(record.manufacturer).to.equal(manufacturer);
            expect(record.country).to.equal(country);
            expect(record.purity).to.equal(purity);
            expect(record.gmpId).to.equal(gmpId);
            expect(record.uploader).to.equal(owner.address);
            expect(record.isActive).to.equal(true);
        });

        it("Should emit the DataStored Event", async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-002";
            const manufacturer = "Johnson & Johnson";
            const country = "USA";
            const purity = 95;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-456";

            await expect(pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            )).to.emit(pharmaData,"DataStored");
        });

        it("Should fail if Batch Id already exists", async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-003";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-789";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            await expect(pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            )).to.be.revertedWith("Record already exists for this batch ID");
        });

        it("Should fail if purity exeeds 100%",  async function() {
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-004";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 105; // purity cannot be > 100
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-101";

            await expect(pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            )).to.be.revertedWith("Purity cannot exceed 100%");
        });
    });

    describe("Update Data", function () {
        it("should allow owner to update IPFS hash", async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const newIpfsHash = "QmY8Cd0eGH3lM5nT7oP9sS2wX3zA6bB8cE0fF1gI2jK3lM";
            const batchId = "BATCH-005";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-202";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            await pharmaData.updateData(batchId,newIpfsHash);
            const record  = await pharmaData.getRecord(batchId);
            expect(record.ipfsHash).to.equal(newIpfsHash);
        });
        it("Should fail if non-owner tries to update", async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const newIpfsHash = "QmY8Cd0eGH3lM5nT7oP9sS2wX3zA6bB8cE0fF1gI2jK3lM";
            const batchId = "BATCH-006";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-303";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            await expect(pharmaData.connect(addr1).updateData(batchId,newIpfsHash)).to.be.revertedWith("Only record owner can perform this action");
        });
    });

    describe("Query Functions" , function () {
        it("Should return User Records", async function (){
            const ipfsHash1 = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const ipfsHash2 = "QmY8Cd0eGH3lM5nT7oP9sS2wX3zA6bB8cE0fF1gI2jK3lM";
            const batchId1 = "BATCH-007";
            const batchId2 = "BATCH-008";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-404";

            await pharmaData.storeData(
                ipfsHash1,
                batchId1,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            await pharmaData.storeData(
                ipfsHash2,
                batchId2,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            const userRecords =  await pharmaData.getUserRecords(owner.address);
            expect(userRecords).to.include(batchId1);
            expect(userRecords).to.include(batchId2);
            expect(userRecords.length).to.equal(2);
        });

        it("Should return total records count",  async function() {
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-009";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-505";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            expect(await pharmaData.getTotalRecords()).to.equal(1);
        });

        it("Should return all Batch Ids", async function() {
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-010";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-606";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            const allBatchIds = await pharmaData.getAllBatchIds();
            expect(allBatchIds).to.include(batchId);
            expect(allBatchIds.length).to.equal(1);
        });
    });

    describe("Record Management", function () {
        it("Should deactivate and reactivate records", async function(){
            const ipfsHash = "QmX7Bc9dFG2hJ3kL4mT6nP8sR1vW2zY5aB7cD9eF0gH1iJ";
            const batchId = "BATCH-011";
            const manufacturer = "Pfizer";
            const country = "USA";
            const purity = 98;
            const productionDate = Math.floor(Date.now() / 1000);
            const expiryDate = productionDate + (365 * 24 * 60 * 60);
            const gmpId = "GMP-707";

            await pharmaData.storeData(
                ipfsHash,
                batchId,
                manufacturer,
                country,
                purity,
                productionDate,
                expiryDate,
                gmpId
            );

            await pharmaData.deactivateRecord(batchId); //deactivate
            let record  = await pharmaData.getRecord(batchId);
            expect(record.isActive).to.equal(false);

            await pharmaData.reactivateRecord(batchId);
            record = await  pharmaData.getRecord(batchId);
            expect(record.isActive).to.equal(true);

        });
    });
});
