import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PharmaDataModule = buildModule("PharmaDataModule", (m) => {
  const pharmaData = m.contract("PharmaceuticalData");

  return { pharmaData };
});

export default PharmaDataModule;
