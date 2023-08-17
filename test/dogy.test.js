const { assert } = require("chai");
const { getNamedAccounts,deployments, ethers } = require("hardhat");


describe("Dogy",()=>{
    let deployer,basicDogyNft,deployedDogy
    beforeEach(async ()=>{
        const accounts = await getNamedAccounts();
        deployer = accounts.deployer
        // user1= accounts.user1
       
        basicDogyNft = await ethers.getContractFactory("Dogy");
         await deployments.fixture(["all"]);
        deployedDogy = await basicDogyNft.deploy();
        
    });
    describe("constructor",()=>{
        console.log("sd");
        it("should have name and symbol",async()=>{
            const name =await deployedDogy.name();
            const symbol =await deployedDogy.symbol();

            assert.equal(name.toString(),"Dogy");
            assert.equal(symbol.toString(),"Do");
        });
        it("token counter = 0",async()=>{
            const tokenCounter = await deployedDogy.getTokenCounter()
            assert.equal(tokenCounter.toString() ,"0");
        });
    });
    describe("mint",()=>{
        beforeEach(async () => {
            const txResponse = await deployedDogy.mint()
            await txResponse.wait(1)
        })
        it("Allows users to mint an NFT, and updates appropriately", async function () {
            const tokenURI = await deployedDogy.tokenURI(0)
            const tokenCounter = await deployedDogy.getTokenCounter()

            assert.equal(tokenCounter.toString(), "1")
            assert.equal(tokenURI, await deployedDogy.TOKEN_URI())
        })
    })
})