const { network } = require("hardhat")
const { developmentChains } = require("../helpers_hardhat.config")
const { verify } = require("../verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts();

    log("--------------------------")
    const arguments =[]
    const dogy =await deploy("Dogy", {
        from:deployer,
        args: arguments,
        log: true,
         waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(dogy.address, arguments)
        console.log("deployed...");
  log("__________________________");
    }
}

module.exports.tags = ["all", "dogy", "main"]