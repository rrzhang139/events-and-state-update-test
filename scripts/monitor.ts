const {
  abi,
} = require("../artifacts/contracts/Lock.sol/DelayedEvent.json");

const hre = require("hardhat");
const ethers = hre.ethers;


const CONTRACT_ADDRESS = "0x4A4DD24163f9B64A669645b0f67fD2fe02c1E487";

async function main() {
  const [deployer] = await ethers.getSigners();
  const provider = deployer.provider;
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  async function updateFlag() {
    const contractWithSigner = contract.connect(deployer);
    await contractWithSigner.updateFlag();
  }

  provider.on("block", async (blockNumber: any) => {
    const flagValue = await contract.flag();
    console.log(`New block: ${blockNumber}, flag value: ${flagValue}`);
  });

  contract.on("FlagUpdated", (newValue: any, event: any) => {
    console.log(`Event received: FlagUpdated, new value: ${newValue}`);
  });

  await updateFlag();
  // setInterval(async () => {
  //   await updateFlag();
  // }, 5000); // Update the flag every 5 seconds
}

main()
  .then(() => console.log("Monitoring started"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });