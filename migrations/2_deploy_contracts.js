var NewElection = artifacts.require("./NewElection.sol")


module.exports = function(deployer) {
  deployer.deploy(NewElection)
};
