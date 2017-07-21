pragma solidity ^0.4.4;

contract Election {

  struct Voter {
    bool voted;
    uint votedFor;
  }

  struct Candidate {
    bytes32 name;
    uint voteCount;
  }

  event Voted(uint candidateID, address voter);

  mapping(address => Voter) public voters;
  Candidate[] public candidates;

  function Election(bytes32[] candidateNames) {
    for (uint i = 0; i < candidateNames.length; i++) {
      candidates.push(Candidate({
        name: candidateNames[i],
        voteCount: 0
      }));
    }
  }

  function getCandidatesCount() public constant returns (uint) {
    return candidates.length;
  }

  function getCandidateVotes(uint candidateID) constant returns (uint totalVotes) {
    Candidate currentCandidate = candidates[candidateID];
    return currentCandidate.voteCount;
  }

  function vote(uint candidateID) returns (uint candidateVotes) {
    Voter sender = voters[msg.sender];
    require(!sender.voted);
    sender.voted = true;
    sender.votedFor = candidateID;

    candidates[candidateID].voteCount++;
    Voted(candidateID, msg.sender);

    return candidates[candidateID].voteCount;
  }

  function countVotes() constant returns (uint winningCandidateID) {
    uint winningVoteCount = 0;
    for (uint candidateID = 0; candidateID < candidates.length; candidateID++) {
      if (candidates[candidateID].voteCount > winningVoteCount) {
        winningVoteCount = candidates[candidateID].voteCount;
        winningCandidateID = candidateID;
      }
    }
  }



}
