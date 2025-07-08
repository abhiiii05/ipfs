// import { ethers } from "hardhat";
// import { validateSepoliaEnvironment } from "./deploy-config";
//
// async function main() {
//     // Validate environment
//     validateSepoliaEnvironment();
//
//     // Get the deployer account
//     const [deployer] = await ethers.getSigners();
//
//     console.log("🔍 Checking Sepolia testnet balance...");
//     console.log("Wallet address:", deployer.address);
//
//     // Get balance
//     const balance = await ethers.provider.getBalance(deployer.address);
//     const balanceInEth = ethers.formatEther(balance);
//
//     console.log(`Current balance: ${balanceInEth} SepoliaETH`);
//
//     // Check if balance is sufficient for deployment (~0.01 ETH minimum)
//     const minimumBalance = ethers.parseEther("0.01");
//
//     if (balance < minimumBalance) {
//         console.log("⚠️  Low balance! You need at least 0.01 SepoliaETH for deployment");
//         console.log("\n💰 Get test tokens from these faucets:");
//         console.log("1. https://sepoliafaucet.com/");
//         console.log("2. https://www.alchemy.com/faucets/ethereum-sepolia");
//         console.log("3. https://cloud.google.com/application/web3/faucet/ethereum/sepolia");
//         process.exit(1);
//     } else {
//         console.log("✅ Balance sufficient for deployment!");
//     }
// }
//
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
