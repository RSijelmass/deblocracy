var Voting = artifacts.require("./Voting.sol");
var Election = artifacts.require("./Election.sol")


module.exports = function(deployer) {
  deployer.deploy(Voting, ['Alice','Bob','Carlos']);
  deployer.deploy(Election,['Yes', 'No'])
};
