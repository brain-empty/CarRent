var carRent = artifacts.require("./carRent.sol")

module.exports = function(deployer) {
    deployer.deploy(carRent);
}