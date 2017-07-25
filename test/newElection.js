var NewElection = artifacts.require('./NewElection.sol')

contract('NewElection', function(accounts) {
  var currentContract;
  var title = "Fake EU Referendum";
  var electionPeriod = 2;
  var loggedEvent;

  it('begins NewElection with candidates', function() {

    return NewElection.new().then(function(instance) {
      currentContract = instance;
      return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
    }).then(function(result) {
      return currentContract.getCandidatesCount();
    }).then(function(numberOfCandidates) {
      assert.equal(numberOfCandidates, 2 , 'Wrong number of candidates')
    });
  });

  it('starts NewElection with zero votes for candidates', function() {

    return NewElection.new().then(function(instance) {
      currentContract = instance;
      return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
    }).then(function(result) {
      return currentContract.getCandidateVotes(0);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate, 0, 'No votes should have been logged for candidate')
    }).then(function() {
      return currentContract.getCandidateVotes(1);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate, 0, 'No votes should have been logged for candidate')
    });
  });

  it('allows voter to cast a Yes vote', function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.registerVoter(accounts[0]);
    }).then(function(result) {
      return currentContract.vote(0);
    }).then(function(currentContractLog) {
      loggedEvent = currentContractLog.logs[0].event;
      assert.equal(loggedEvent, 'Voted', 'Voter could not cast a vote')
    });
  });

  it('allows voter to cast a No vote', function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.registerVoter(accounts[0]);
    }).then(function(result) {
      return currentContract.vote(1);
    }).then(function(currentContractLog) {
      loggedEvent = currentContractLog.logs[0].event;
      assert.equal(loggedEvent, 'Voted', 'Voter could not cast a vote')
    });
  });

  it('shows accurate number of cast votes for a candidate', function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.registerVoter(accounts[0]);
    }).then(function(result) {
      return currentContract.vote(1);
    }).then(function() {
      return currentContract.getCandidateVotes(1);
    }).then(function(totalVotesForCandidate) {
      assert.equal(totalVotesForCandidate.toNumber(), 1, 'Cannot find cast votes for candidate')
    });
  });

  it('returns winning candidate ID', function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.vote(0);
    }).then(function() {
      return currentContract.tallyElectionResults();
    }).then(function(winningCandidateID) {
      assert.equal(winningCandidateID, 0, 'No winning candidate was returned')
    });
  });

  it('declares NewElection winner', function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.vote(0);
    }).then(function() {
      return currentContract.declareWinner();
    }).then(function(NewElectionWinner) {
      assert.equal(NewElectionWinner, 'Yes', 'Not returning right NewElection winner');
    });
  });

  it("allows a voter to become registered", function() {

    return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
      return currentContract.registerVoter(accounts[0]);
    }).then(function(result) {
      loggedEvent = result.logs[0].event;
      assert.equal(loggedEvent, "Registered", 'Voter has not been registered')
    });
  });

	it("creates a new election", function() {

		return NewElection.new().then(function(instance) {
			currentContract = instance;
			return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
		}).then(function(result) {
			loggedEvent = result.logs[0].event;
			assert.equal(loggedEvent, 'Created', 'Election has not been created')
		});
	});

  it("gets the election name", function() {

   return NewElection.new().then(function(instance) {
      currentContract = instance;
      return currentContract.createElection('Fake Election', 2, ['Yes', 'No'])
    }).then(function(result) {
      return currentContract.getElectionName();
    }).then(function(electionName) {
      assert.equal(electionName, 'Fake Election' , 'Election has not been created')
    });
  });
});
