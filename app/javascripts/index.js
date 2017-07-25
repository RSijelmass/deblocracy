web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	//var fs = require("fs");
//	var data = fs.readFileSync(".../build/contracts/NewElection.json");
	ElectionContract = web3.eth.contract(data.abi);

	//Hard coded address that needs to be set up & changed each time
	var contractInstance = ElectionContract.at('0x38d71207a80068c23253c5c7b8f7ed931092d048');

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

	function updateTally(candidate) {
		var tally = contractInstance.getCandidateVotes.call(candidate)
		console.log(tally.toNumber())
		document.getElementById(`${candidate}-votes`).innerHTML = tally;
	};

	function displayResults(candidates) {
		candidates.forEach(function(candidate) {
			updateTally(candidate)
		});
		displayOwnVote();
	};

	function displayOwnVote() {
		console.log(contractInstance.displayOwnVote())
		document.getElementById("own-vote").innerHTML = contractInstance.displayOwnVote.call()
	}
