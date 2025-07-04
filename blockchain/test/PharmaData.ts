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
            )).to.emit(pharmaData,"Data Stored Successfully");
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
        })
    });
})
