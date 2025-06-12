const hre = require("hardhat");

async function main() {
  // Deploy the contract
  const TheLabNFT = await hre.ethers.getContractFactory("TheLabNFT");
  const nft = await TheLabNFT.deploy(
    "The Lab CD Idea",
    "THELAB",
    "ipfs://bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4/",
    "An exclusive NFT for The Lab supporters."
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