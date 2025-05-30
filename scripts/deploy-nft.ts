import { ethers } from "hardhat";

async function main() {
  // Desplegar el contrato
  const TheLabNFT = await ethers.getContractFactory("TheLabNFT");
  const nft = await TheLabNFT.deploy(
    "The Lab NFT",
    "LABNFT",
    "ipfs://YOUR_METADATA_CID/" // Reemplazar con el CID real de los metadatos
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