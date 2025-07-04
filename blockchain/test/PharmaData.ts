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
})
