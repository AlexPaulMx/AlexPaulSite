const hre = require("hardhat");

async function main() {
  // Dirección del contrato NFT
  const nftAddress = "0xCe75F272c41F152b6dF0F6ED35a693F5a0DB9e11";
  // Dirección del contrato de donaciones
  const donationAddress = "0xe395360333F8f8B335C8b8E2619CfcF530dFc429";

  const TheLabNFT = await hre.ethers.getContractAt("TheLabNFT", nftAddress);
  const tx = await TheLabNFT.setDonationContract(donationAddress);
  await tx.wait();
  console.log(`Donation contract set to: ${donationAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 