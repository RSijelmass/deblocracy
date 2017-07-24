web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
	ElectionContract = web3.eth.contract(data.abi);

	//Hard coded address that needs to be set up & changed each time
	var contractInstance = ElectionContract.at('0x6594596cabe16ad4a9dfd582f91b81bf583ad23d');

	function voteYes() {
		contractInstance.vote(0, {from: web3.eth.accounts[1]})
		document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
		updateTally(0)
	}

	function voteNo() {
		contractInstance.vote(1, {from: web3.eth.accounts[1]})
		document.getElementById("msg").innerHTML = "You voted!"
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
