var VotingObject = artifacts.require("./Voting.sol");

contract('Voting', function(accounts) {

  it('can intialize with candidates', function() {
    return VotingObject.deployed().then(function(instance) {
      return instance.getCandidates.call({from: accounts[0]})
    }).then(function(ballot) {
      assert.equal(ballot.length, 3, "Should have 3 candidates")
    });
  });

  it('can check if a candidate is valid', function() {
    return VotingObject.deployed().then(function(instance) {
      return instance.validCandidate.call("Alice", {from: accounts[0]})
    }).then(function(candidate){
      assert.equal(candidate, true, "But Alice is real!")
    });
  });


  it('can cast a vote', function() {
    return VotingObject.deployed().then(function(instance) {
      return instance.voteForCandidate.call("Anna", {from: accounts[0]})
    }).then(function(votesReceived){
      assert.equal(votesReceived.valueOf(), 1, "Managed to somehow magically vote")
    });
  });


  it('can see that a vote has been cast', function() {
    return VotingObject.deployed().then(function(instance) {
      instance.voteForCandidate("Anna", {from: accounts[0]})
			return instance.totalVotesFor.call("Anna")
    }).then(function(votes){
      assert.equal(votes.toNumber(), 1, "Anna got a vote!");
    });
  });
});
