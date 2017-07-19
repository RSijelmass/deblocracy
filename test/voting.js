var Voting = artifacts.require("./Voting.sol");

contract('Voting', function(accounts) {
  it('should be initialized with three candidates', function() {
    console.log('hello1')
    return Voting.deployed().then(function(instance) {
        console.log('hello2')
        console.log(instance.candidateList)
      return instance.call(accounts[0]);
        console.log('hello3')
    }).then(function(candidateList){
        console.log('hello4')
      assert.equal(candidateList.valueOf(), ['Rama', 'Jose', 'DemocRITA'], "3 candidates not available for voting")
        console.log('hello5')
    });
  });
});
