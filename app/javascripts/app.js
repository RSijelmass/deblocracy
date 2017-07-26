
import "../stylesheets/app.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'


import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

let candidates = {0: "candidate-1", 1: "candidate-2"};
var validNumber;
var transactionID; //currently will disappear if page is refreshed

window.voteForCandidate = function(candidateID) {
  console.log(validNumber);
  try {
    if (validNumber == null) {
      document.getElementById("msg").innerHTML = "You need to be registered to vote.";
    };

    Voting.deployed().then(function(contractInstance) {
      contractInstance.vote(candidateID, {from: validNumber}).then(function(transaction) {
        transactionID = transaction.tx;
        let div_id = candidates[candidateID];
        return contractInstance.getCandidateVotes.call(candidateID).then(function(candidateVote) {
          alert("Your vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain!")
          document.getElementById(div_id).innerHTML = candidateVote.toString();
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.displayVote = function() {
  try {
    Voting.deployed().then(function(contractInstance) {
      return contractInstance.displayOwnVote.call({from: validNumber}).then(function(vote) {
        document.getElementById("transaction-id").innerHTML = transactionID
        document.getElementById("current-account-vote").innerHTML = vote;
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.validate = function() {
  let voterNumber = document.getElementById("account-number").value

  try {
    Voting.deployed().then(function(contractInstance) {
      for(var i=0; i < web3.eth.accounts.length; i++) {
        if (web3.eth.accounts[i] == voterNumber) {
          validNumber = web3.eth.accounts[i]
          contractInstance.registerVoter(web3.eth.accounts[i], { from: web3.eth.accounts[0] }).then(function() {
            document.getElementById("validatedaccountnumber").innerHTML = `You are now registered to vote as ID number ${validNumber}`;
            return validNumber;
          });
        };
      };
      document.getElementById("validatedaccountnumber").innerHTML = "That is not a valid account number";
    });
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let id = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.getCandidateVotes.call(id).then(function(candidateVote) {
        document.getElementById(candidates[id]).innerHTML = candidateVote.toString();
      });
    })
  }
});
