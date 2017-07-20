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

  function getCandidateVotes(uint candidate) constant returns (uint totalVotes) {
    Candidate currentCandidate = candidates[candidate];
    return currentCandidate.voteCount;
  }

  function vote(uint candidate) {
    Voter sender = voters[msg.sender];
    require(!sender.voted);
    sender.voted = true;
    sender.votedFor = candidate;

    candidates[candidate].voteCount++;
  }


}
