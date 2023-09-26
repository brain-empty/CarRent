var car = artifacts.require("./car.sol")

module.exports = function(deployer) {
    deployer.deploy(car);
}