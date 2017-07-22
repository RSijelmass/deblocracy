web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//document.addEventListener('DOMContentLoaded', function() {

	ElectionContract = web3.eth.contract(data.abi);
	//deployedContract = ElectionContract.new(['Yes', 'No'], {from: web3.eth.accounts[0], gas: 4700000})
	//console.log(deployedContract.address)
	contractInstance = ElectionContract.at('0x3f90d19f535f850ef9535c59f6cdc36f05c0da7d');

	function voteYes() {
		document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
		contractInstance.vote(0, {from: web3.eth.accounts[0]})
		console.log(contractInstance.vote)
		console.log(contractInstance.vote(0, {from: web3.eth.accounts[0]}))
		updateTally(0)
	}

	function voteNo() {
		document.getElementById("msg").innerHTML = "You voted!"
		contractInstance.vote(1, {from: web3.eth.accounts[0]})
		updateTally(1)
	}

	function updateTally(candidate) {
		var tally = contractInstance.getCandidateVotes.call(candidate)
		console.log(contractInstance.getCandidateVotes);
		console.log(tally.toNumber())
		document.getElementById(`${candidate}-votes`).innerHTML = tally;
	};
//});

