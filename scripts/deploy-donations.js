const hre = require("hardhat");

async function main() {
  // Dirección del contrato NFT desplegado
  const nftAddress = "0xCe75F272c41F152b6dF0F6ED35a693F5a0DB9e11";
  
  // Dirección del contrato USDC en Base
  const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC en Base
  
  // Desplegar el contrato de donaciones
  const TheLabDonations = await hre.ethers.getContractFactory("TheLabDonations");
  const donations = await TheLabDonations.deploy(
    nftAddress,                    // Dirección del contrato NFT
    hre.ethers.parseEther("0.0001"), // Mínimo de donación: 0.0001 ETH
    "ipfs://bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4/", // URI del NFT
    usdcAddress,                   // Dirección del contrato USDC
    hre.ethers.parseUnits("0.01", 6)  // Mínimo de donación: 0.01 USDC (6 decimales)
  );

  await donations.waitForDeployment();

  console.log("TheLabDonations deployed to:", await donations.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 