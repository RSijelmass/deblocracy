var Election = artifacts.require("./Election.sol")

contract('Election', function() {

  it("begins elections with candidates", function() {

    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.getCandidatesCount();
    }).then(function(number_of_candidates) {
      assert.equal(number_of_candidates, 2 , 'Candidates should be logged')
    });
  });

  it("starts elections with zero votes for candidates", function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.getCandidateVotes(0);
    }).then(function(totalVotes) {
      assert.equal(totalVotes, 0, 'No votes should be logged')
    }).then(function() {
      return election.getCandidateVotes(1);
    }).then(function(totalVotes) {
      assert.equal(totalVotes,0, 'No votes')
    });
  });

  it("allows voter to vote Yes", function() {
    var election;
    var loggedEvent;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.vote(0);
    }).then(function(result) {
      loggedEvent = result.logs[0].event;
      assert.equal(loggedEvent, "Voted", 'Vote was not registered!')
    });
  });

  it("allows voter to vote No", function() {
    var election;
    var loggedEvent;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.vote(1);
    }).then(function(result) {
      loggedEvent = result.logs[0].event;
      assert.equal(loggedEvent, "Voted", 'Vote was not registered!')
    });
  });

  it("displays a cast vote", function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.vote(1);
    }).then(function() {
      return election.getCandidateVotes(1);
    }).then(function(totalVotes) {
      assert.equal(totalVotes.toNumber(), 1, 'Cast vote is not displayed')
    });
  });

  it("tallies election results", function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.vote(0);
    }).then(function() {
      return election.tallyElectionResults();
    }).then(function(winningCandidateID) {
      assert.equal(winningCandidateID, 0, 'No winning candidate was returned')
    });
  });


});
