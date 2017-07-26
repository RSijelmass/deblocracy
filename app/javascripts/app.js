
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
      $("#msg").html("You need to be registered to vote.");
    };

    Voting.deployed().then(function(contractInstance) {
      contractInstance.vote(candidateID, {from: validNumber}).then(function(transaction) {
        transactionID = transaction.tx;
        let div_id = candidates[candidateID];
        return contractInstance.getCandidateVotes.call(candidateID).then(function(v) {
          alert("Your vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain!")
          $("#" + div_id).html(v.toString());
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
        $("#transaction-id").html(transactionID);
        $("#current-account-vote").html(vote);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.vote = function() {
  let candidateID = parseInt($("#candidate").val());  // Assigns text input to candidateName
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#candidate").val("");

    Voting.deployed().then(function(contractInstance) {
      contractInstance.vote(candidateID, {from: web3.eth.accounts[0]}).then(function() {
        let div_id = candidates[candidateID];
        return contractInstance.getCandidateVotes.call(candidateID).then(function(v) {
          $("#" + div_id).html(v.toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.validate = function() {
  let voterNumber = $("#account-number").val();

  try {
    Voting.deployed().then(function(contractInstance) {
    for(var i=0; i < web3.eth.accounts.length; i++) {
  		if (web3.eth.accounts[i] == voterNumber) {
  			validNumber = web3.eth.accounts[i]
  			contractInstance.registerVoter(web3.eth.accounts[i], { from: web3.eth.accounts[0] }).then(function() {
          $("#validatedaccountnumber").html(`You are now registered to vote as ID number ${validNumber}`);
    			return validNumber;
        });
  		};
  	};
    $("#validatedaccountnumber").html("That is not a valid account number");
  });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
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
      contractInstance.getCandidateVotes.call(id).then(function(v) {
        $("#" + candidates[id]).html(v.toString());
      });
    })
  }
});
