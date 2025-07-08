"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
const PharmaDataModule = (0, modules_1.buildModule)("PharmaDataModule", (m) => {
    const pharmaData = m.contract("PharmaceuticalData");
    return { pharmaData };
});
exports.default = PharmaDataModule;
