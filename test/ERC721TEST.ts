import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("MyNFT", function () {
  let myNFT: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
   const [owner, addr1, addr2] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.deployed();
  });

  it("should mint and burn NFTs", async function () {
    const tokenId = 1;

    // Mint a token to addr1
    await myNFT.connect(owner).mint(await addr1.getAddress(), tokenId);

    // Check the balance of addr1
    const balanceOfAddr1 = await myNFT.balanceOf(await addr1.getAddress());
    expect(balanceOfAddr1).to.equal(1);

    // Transfer the token from addr1 to addr2
    await myNFT.connect(addr1).transferFrom(await addr1.getAddress(), await addr2.getAddress(), tokenId);

    // Check the new owner
    const newOwner = await myNFT.ownerOf(tokenId);
    expect(newOwner).to.equal(await addr2.getAddress());

    // Burn the token as addr2
    await myNFT.connect(addr2).burn(tokenId);

    // Check that the token is burned
    await expect(myNFT.ownerOf(tokenId)).to.be.revertedWith("token doesn't exist");
  });
});
