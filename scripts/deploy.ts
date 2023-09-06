import { ethers } from "hardhat";

async function main() {
    const ERC721 = await ethers.deployContract("ERC721");

    await ERC721.waitForDeployment();

    console.log(`ERC721 deployed to ${ERC721.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});