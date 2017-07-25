// document.addEventListener("DOMContentLoaded", function(){
// 		if (typeof web3 !== 'undefined') {
// 		console.warn("Using web3 detected from external source like Metamask")
// 		window.web3 = new Web3(web3.currentProvider);
// 	} else {
// 		console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
// 		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// 	}
// })

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
import { default as Web3 } from 'web3';
	//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
ElectionContract = web3.eth.contract(data.abi);

//Hard coded address that needs to be set up & changed each time
var contractInstance = ElectionContract.at('0x6594596cabe16ad4a9dfd582f91b81bf583ad23d');

function voteYes() {
	contractInstance.vote(0, {from: web3.eth.accounts[1]})
	document.getElementById("msg").innerHTML = "YOU VOTED YAAAAAAASSSSSS"
	updateTally(0)
}

function voteNo() {
	contractInstance.vote(1, {from: web3.eth.accounts[1]})
	document.getElementById("msg").innerHTML = "You voted NAAAAAAAAHHHHH"
	updateTally(1)
}

//Not currently printing a number of votes to browser
function updateTally(candidate) {
	var tally = contractInstance.getCandidateVotes.call(candidate)
	console.log(tally.toNumber())
	document.getElementById(`${candidate}-votes`).innerHTML = tally;
};

function registerVoter() {
	contractInstance.registerVoter(web3.eth.accounts[1], {from: web3.eth.accounts[1] });
}
