var VotingObject = artifacts.require("./Voting.sol");

contract('Voting', function(accounts) {
  it('can cast a vote', function() {
    return VotingObject.deployed().then(function(instance) {
      return instance.voteForCandidate.call("Anna", {from: accounts[0]})
    }).then(function(has_succeeded){
      assert.equal(has_succeeded.valueOf(), true, "Managed to somehow magically vote")
    });
  });


  it('can see that a vote has been cast', function() {
    var meta;
    var candidate = "Anna";
    var voter = accounts[0];
    return VotingObject.deployed().then(function(instance) {
      meta = instance;
      return instance.voteForCandidate.call(candidate, {from: voter})
    }).then(function(ignore_success_at_the_moment){
      return meta.totalVotesFor.call(candidate);
    }).then(function(votes){
      console.log(votes);
      assert.equal(votes.toNumber(), 1, "Anna got a vote!");
    });
  });
});
