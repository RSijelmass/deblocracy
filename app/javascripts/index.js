
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
ElectionContract = web3.eth.contract(data.abi);

//Hard coded address that needs to be set up & changed each time
var contractInstance = ElectionContract.at('0x693ac094b0713d53e27e1d488e695f031b0635a1');

var accounts = web3.eth.accounts;


function voteYes() {
	contractInstance.vote(0, {from: assignAccount()})
	document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
	updateTally(0)
};

function voteNo() {
	contractInstance.vote(1, {from: assignAccount()})
	document.getElementById("msg").innerHTML = "You voted!"
	updateTally(1)
};

function updateTally(candidate) {
	var tally = contractInstance.getCandidateVotes.call(candidate)
	console.log(tally.toNumber())
	document.getElementById(`${candidate}-votes`).innerHTML = tally;
};

function assignAccount() {
	var num = Math.floor(Math.random() * accounts.length - 5);
	var currentAccount = accounts.splice(num,1);
	console.log(`${currentAccount}`)
	document.getElementById("account").innerHTML = currentAccount;
	return currentAccount.toString();
};

function registerVoter() {
	contractInstance.registerVoter(web3.eth.accounts[1], {from: web3.eth.accounts[1] });
}
