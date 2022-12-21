import { Contract } from "ethers";

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("ERC20Factory", function () {
  let ERC20Factory: Contract;
  let users, owner, addr1, addr2;

  before(async () => {
    users = await ethers.getSigners();
    owner = users[0];
    addr1 = users[1];
    addr2 = users[2];
  });

  beforeEach(async () => {
    ERC20Factory = await ethers.getContractFactory("ERC20Factory");
    ERC20Factory = await ERC20Factory.deploy("Faria", "FAR", 10000);
    await ERC20Factory.deployed();
  });

  describe("Deployment and minting", function () {
    it("Should check if deployment occured", async function () {
      expect(
        BigNumber.from(await ERC20Factory.balanceOf(owner.address)).toString()
      ).to.equal("10000000000000000000000");
    });

    it("Should mint more tokens", async function () {
      await ERC20Factory.mint(owner.address, 1);
      expect(
        BigNumber.from(await ERC20Factory.balanceOf(owner.address)).toString()
      ).to.equal("10000000000000000000001");
    });

    it("Should fail if minter does not have minter role", async function () {
      await expect(
        ERC20Factory.connect(addr1).mint(addr1.address, 1)
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
      );
    });
  });
});
