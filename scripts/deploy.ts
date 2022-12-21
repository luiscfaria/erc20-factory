const hre = require("hardhat");

async function main() {
  const tokenName = "Faria";
  const tokenSymbol = "FAR";
  const initialAmount = 10000;

  let ERC20Factory = await hre.ethers.getContractFactory("ERC20Factory");
  ERC20Factory = await ERC20Factory.deploy(
    tokenName,
    tokenSymbol,
    initialAmount
  );

  await ERC20Factory.deployed();

  console.log(`Deployed to ${ERC20Factory.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
