"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEPOLIA_CONFIG = void 0;
exports.validateSepoliaEnvironment = validateSepoliaEnvironment;
exports.SEPOLIA_CONFIG = {
    name: "Sepolia Testnet",
    chainId: 1115511,
    blockExplorer: "https://sepolia.etherscan.io",
    etherscanApi: "https://api-sepolia.etherscan.io/api",
    faucets: [
        "https://sepoliafaucet.com/",
        "https://www.alchemy.com/faucets/ethereum-sepolia",
        "https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
    ],
    rpcUrl: "https://sepolia.infura.io/v3/",
    currency: "SepoliaETH",
    gasSettings: {
        gasLimit: 6000000,
        gasPrice: 20000000000, // 20 gwei
        estimatedDeploymentCost: "~$15-25 USD"
    }
};
function validateSepoliaEnvironment() {
    const requiredVars = ['PRIVATE_KEY', 'INFURA_API_KEY'];
    const optionalVars = ['ETHERSCAN_API_KEY'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    if (missing.length > 0) {
        throw new Error(`Missing required enironmental variables : ${missing.join(",")}`);
    }
}
