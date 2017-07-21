pragma solidity ^0.4.4;

contract NewElection {

  struct Voter {
    bool voted;
    uint votedFor;
  }

  struct Candidate {
    bytes32 name;
    uint voteCount;
  }

  struct Election {
    address administrator;
    string title;
    uint deadline;
    bool status;
    Candidate[] candidates;
  }

  event Voted(uint candidateID, address voter);
  Election public currentElection;
  mapping(address => Voter) public voters;

  function NewElection(string _title, uint electionPeriod, bytes32[] candidateNames) {
    for (uint i = 0; i < candidateNames.length; i++) {
      currentElection.candidates.push(Candidate({
        name: candidateNames[i],
        voteCount: 0
        }));
      }
      currentElection.administrator = msg.sender;
      currentElection.title = _title;
      currentElection.deadline = now + electionPeriod * 1 days;
      currentElection.status = true;
    }

    function getCandidatesCount() constant returns (uint) {
      return currentElection.candidates.length;
    }

    function getCandidateVotes(uint candidateID) constant returns (uint totalVotes) {
      Candidate currentCandidate = currentElection.candidates[candidateID];
      return currentCandidate.voteCount;
    }

    function vote(uint candidateID) returns (uint votesForCandidate) {
      Voter currentVoter = voters[msg.sender];

      if (!currentVoter.voted) {
        currentVoter.voted = true;
        currentVoter.votedFor = candidateID;

        currentElection.candidates[candidateID].voteCount++;
        Voted(candidateID, msg.sender);
      }
      return currentElection.candidates[candidateID].voteCount;
    }

    function tallyElectionResults() constant returns (uint winningCandidateID) {
      uint winningVoteCount = 0;
      for (uint candidateID = 0; candidateID < currentElection.candidates.length; candidateID++) {
        if (currentElection.candidates[candidateID].voteCount > winningVoteCount) {
          winningVoteCount = currentElection.candidates[candidateID].voteCount;
          winningCandidateID = candidateID;
        }
      }
    }

    function declareWinner() constant returns (string winnerName) {
      bytes32 winnerBytes = currentElection.candidates[tallyElectionResults()].name;
      winnerName = bytes32ToString(winnerBytes);
    }

    function bytes32ToString(bytes32 data) returns (string) {
      bytes memory bytesString = new bytes(32);
      for (uint j=0; j<32; j++) {
        byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
        if (char != 0) {
          bytesString[j] = char;
        }
      }
      return string(bytesString);
    }
  }
