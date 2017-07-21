var Election = artifacts.require('./Election.sol')

contract('Election', function(accounts) {

  it('begins election with candidates', function() {

    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.getCandidatesCount();
    }).then(function(numberOfCandidates) {
      assert.equal(numberOfCandidates, 2 , 'Wrong number of candidates')
    });
  });

  it('starts election with zero votes for candidates', function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.getCandidateVotes(0);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate, 0, 'No votes should have been logged for candidate')
    }).then(function() {
      return election.getCandidateVotes(1);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate, 0, 'No votes should have been logged for candidate')
    });
  });

  it('allows voter to cast a Yes vote', function() {
    var election;
    var loggedEvent;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return instance.registerVoter(accounts[0]);
    }).then(function(result) {
      return election.vote(0);
    }).then(function(electionLog) {
      loggedEvent = electionLog.logs[0].event;
      assert.equal(loggedEvent, 'Voted', 'Voter could not cast a vote')
    });
  });

  it('allows voter to cast a No vote', function() {
    var election;
    var loggedEvent;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return instance.registerVoter(accounts[0]);
    }).then(function(result) {
      return election.vote(1);
    }).then(function(electionLog) {
      loggedEvent = electionLog.logs[0].event;
      assert.equal(loggedEvent, 'Voted', 'Voter could not cast a vote')
    });
  });

  it('shows accurate number of cast votes for a candidate', function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return instance.registerVoter(accounts[0]);
    }).then(function(result) {
      return election.vote(1);
    }).then(function() {
      return election.getCandidateVotes(1);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate.toNumber(), 1, 'Cannot find cast votes for candidate')
    });
  });

  it('returns winning candidate ID', function() {
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

  it('declares election winner', function() {
    var election;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return election.vote(0);
    }).then(function() {
      return election.declareWinner();
    }).then(function(electionWinner) {
      assert.equal(electionWinner, 'Yes', 'Not returning right election winner');
    });
  });

  it("allows a voter to become registered", function() {

    var election;
    var loggedEvent;

    return Election.new(['Yes', 'No']).then(function(instance) {
      election = instance;
      return instance.registerVoter(accounts[0]);
    }).then(function(result) {
      loggedEvent = result.logs[0].event;
      assert.equal(loggedEvent, "Register", 'Voter has not been registered')
    });
  });


});
