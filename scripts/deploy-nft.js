const hre = require("hardhat");

async function main() {
  // Deploy the contract
  const TheLabNFT = await hre.ethers.getContractFactory("TheLabNFT");
  const nft = await TheLabNFT.deploy(
    "The Lab Genesis NFT",
    "THELAB",
    "ipfs://QmbyXv282D2x5wW4L5B8H9B6c4z1A3E6F7G8H9I0J1K",
    "An exclusive NFT for The Lab Crew."
  );

  await nft.waitForDeployment();

  console.log("TheLabNFT deployed to:", await nft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 