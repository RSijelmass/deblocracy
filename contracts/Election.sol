pragma solidity ^0.4.4;

contract Election {

  struct Voter {
    bool voted;
    uint votedFor;
    bool register;
  }

  struct Candidate {
    bytes32 name;
    uint voteCount;
  }

  event Voted(uint candidateID, address voter);

  event Register(address voter);

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

  function registerVoter(address account){
    Voter sender = voters[account];
    sender.register = true;

    Register(account);
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
    if (sender.register){
    require(!sender.voted);
    sender.voted = true;
    sender.votedFor = candidateID;

    candidates[candidateID].voteCount++;
    Voted(candidateID, msg.sender);
    }
    return candidates[candidateID].voteCount;
  }

    function tallyElectionResults() constant returns (uint winningCandidateID) {
      uint winningVoteCount = 0;
      for (uint candidateID = 0; candidateID < candidates.length; candidateID++) {
        if (candidates[candidateID].voteCount > winningVoteCount) {
          winningVoteCount = candidates[candidateID].voteCount;
          winningCandidateID = candidateID;
        }
      }
    }

    function declareWinner() constant returns (string winnerName) {
      bytes32 winnerBytes = candidates[tallyElectionResults()].name;
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
