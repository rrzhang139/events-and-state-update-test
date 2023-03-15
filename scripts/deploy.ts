import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const ContractFactory = await ethers.getContractFactory("DelayedEvent");
  const contract = await ContractFactory.deploy();

  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
