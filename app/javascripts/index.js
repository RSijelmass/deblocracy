
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
ElectionContract = web3.eth.contract(data.abi);

//Hard coded address that needs to be set up & changed each time
var contractInstance = ElectionContract.at('0x8752069070928e3210c16af38c42d17a0fecc357');

var accounts = web3.eth.accounts;

var validNumber;



function voteYes() {
	contractInstance.vote(0, {from: validNumber})
	document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
	updateTally(0)
};

function voteNo() {
	contractInstance.vote(1, {from: validNumber})
	document.getElementById("msg").innerHTML = "You voted!"
	updateTally(1)
};

function updateTally(candidate) {
	var tally = contractInstance.getCandidateVotes.call(candidate)
	document.getElementById(`${candidate}-votes`).innerHTML = tally;
};

function validate(number = document.getElementById("accountnumber").value) {
	for(i=0; i<web3.eth.accounts.length; i++) {
		if (web3.eth.accounts[i] == number) {
			validNumber = web3.eth.accounts[i]
			contractInstance.registerVoter(web3.eth.accounts[i], { from: web3.eth.accounts[i] });
			document.getElementById(`validatedaccountnumber`).innerHTML = `You are now registered to vote as id number ${validNumber}`;
			return validNumber
		}
	}
	document.getElementById(`validatedaccountnumber`).innerHTML = `That is not a valid account number`;
}

function userCreatedElection(userElectionName = document.getElementById("createanelection").value) {
			contractInstance.getElectionTitle({ from: validNumber });
			document.getElementById(`validateusercreatedelection`).innerHTML = `You have now entered your election title: ${userElectionName}`;
}

function displayResults(candidates) {
	candidates.forEach(function(candidate) {
		updateTally(candidate)
	});
};
