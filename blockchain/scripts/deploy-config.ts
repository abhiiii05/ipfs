export const SEPOLIA_CONFIG = {
    name : "Sepolia Testnet",
    chainId : 11155111,
    blockExplorer : "https://sepolia.etherscan.io",
    etherscanApi : "https://api-sepolia.etherscan.io/api",
    faucets : [
        "https://sepoliafaucet.com/",
        "https://www.alchemy.com/faucets/ethereum-sepolia",
        "https://cloud.google.com/application/web3/faucet/ethereum/sepolia"

    ],
    rpcUrl : "https://sepolia.infura.io/v3/",
    currency: "SepoliaETH",
    gasSettings: {
        gasLimit: 6000000,
        gasPrice: 20000000000, // 20 gwei
        estimatedDeploymentCost: "~$15-25 USD"
    }
};

export function validateSepoliaEnvironment(){
    const requiredVars = ['PRIVATE_KEY', 'INFURA_API_KEY'];
    const optionalVars = ['ETHERSCAN_API_KEY'];

    const missing = requiredVars.filter(varName => !process.env[varName]);

    if(missing.length > 0){
        throw new Error(`Missing required enironmental variables : ${missing.join(",")}`);

    }
    console.log("Required env varaibles validated");

    optionalVars.forEach(varName => {
        if (!process.env[varName]) {
            console.log(`Optional variable ${varName} not set - contract verification will be skipped`);
        } else {
            console.log(`${varName} configured - contract verification enabled`);
        }
    });
}

export function getSepoliaDeploymentInfo() {
    return {
        network: SEPOLIA_CONFIG.name,
        chainId: SEPOLIA_CONFIG.chainId,
        explorer: SEPOLIA_CONFIG.blockExplorer,
        estimatedCost: SEPOLIA_CONFIG.gasSettings.estimatedDeploymentCost,
        faucets: SEPOLIA_CONFIG.faucets
    };
}

export function printPreDeploymentChecklist() {
    console.log('\n📋 Pre-Deployment Checklist for Sepolia:');
    console.log('1. ✅ Environment variables configured');
    console.log('2. ⏳ Check wallet has sufficient SepoliaETH');
    console.log('3. ⏳ Verify contract compiles successfully');
    console.log('4. ⏳ Run tests to ensure contract functionality');
    console.log('\n💰 Get test tokens from faucets:');
    SEPOLIA_CONFIG.faucets.forEach((faucet, index) => {
        console.log(`   ${index + 1}. ${faucet}`);
    });
    console.log(`\n💸 Estimated deployment cost: ${SEPOLIA_CONFIG.gasSettings.estimatedDeploymentCost}`);
}

export function getContractVerificationUrl(contractAddress: string) {
    return `${SEPOLIA_CONFIG.blockExplorer}/address/${contractAddress}#code`;
}
