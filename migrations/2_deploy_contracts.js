require("dotenv").config();

var CombustTokenContract = artifacts.require("CMBSTToken");
var MasterChefContract = artifacts.require("MasterChef");
var AshContract = artifacts.require("AshBar");


module.exports = function(deployer, network) {

    let operator = process.env.OPERATOR;

    deployer.then(async () => {
        var cmbstInstance = await deployer.deploy(CombustTokenContract, {
            from : operator
        });
        console.log("Deployed CombustToken Contract : " + cmbstInstance.address);

        var ashInstance = await deployer.deploy(AshContract, cmbstInstance.address, {
            from : operator
        });
        console.log("Deployed AshToken Contract : " + ashInstance.address);

        const _cmbstPerBlock = 100;
        const _startBlock = 10;
        var masterChefInstance = await deployer.deploy(MasterChefContract, cmbstInstance.address, ashInstance.address, process.env.DEV_ADDRESS, _cmbstPerBlock, _startBlock, {
            from : operator
        });
        console.log("Deployed MasterChef Contract : " + masterChefInstance.address);
    });
};
