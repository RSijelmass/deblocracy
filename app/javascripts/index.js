web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
ElectionContract = web3.eth.contract(data.abi);

var contractInstance = ElectionContract.at('0x693ac094b0713d53e27e1d488e695f031b0635a1');

var accounts = web3.eth.accounts;

function voteYes() {
	document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
	contractInstance.vote(0, {from: assignAccount()})
	updateTally(0)
};

function voteNo() {
	document.getElementById("msg").innerHTML = "You voted!"
	contractInstance.vote(1, {from: assignAccount()})
	updateTally(1)
};

function updateTally(candidate) {
	var tally = contractInstance.getCandidateVotes.call(candidate)
	document.getElementById(`${candidate}-votes`).innerHTML = tally;
};

function displayResults(candidates) {
	candidates.forEach(function(candidate) {
		updateTally(candidate)
	});
};	

function assignAccount() {
	var num = Math.floor(Math.random() * accounts.length - 5);
	var currentAccount = accounts.splice(num,1);
	document.getElementById("account").innerHTML = currentAccount;
	return currentAccount.toString();
};
