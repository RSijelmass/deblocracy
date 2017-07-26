var Voting = artifacts.require("./Voting.sol");

contract('Voting', function(accounts) {
  it('should be initialized with three candidates', function() {
    console.log('hello')
    return Voting.deployed().then(function(instance) {
      return instance.candidateList.call(accounts[0]);
    }).then(function(candidateList){
      assert.equal(candidateList.valueOf(), ['Rama', 'Jose', 'DemocRITA'], "3 candidates not available for voting")
    });
  });
});
