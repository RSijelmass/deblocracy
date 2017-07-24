web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
	ElectionContract = web3.eth.contract(data.abi);

	//Hard coded address that needs to be set up & changed each time
	var contractInstance = ElectionContract.at('0x8c1ff4b33f30a97157cd2b64b0f9c2ce5861e56e');

	function voteYes() {
		document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
		contractInstance.vote(0, {from: web3.eth.accounts[0]})
		updateTally(0)
	}

	function voteNo() {
		document.getElementById("msg").innerHTML = "You voted!"
		contractInstance.vote(1, {from: web3.eth.accounts[0]})
		updateTally(1)
	}

	//Not currently printing a number of votes to browser
	function updateTally(candidate) {
		var tally = contractInstance.getCandidateVotes.call(candidate)
		console.log(tally.toNumber())
		document.getElementById(`${candidate}-votes`).innerHTML = tally;
	};
