const Wheels = artifacts.require('Wheels.sol')

module.exports = function (deployer) {
  deployer.deploy(Wheels)
}
