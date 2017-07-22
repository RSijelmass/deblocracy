web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//document.addEventListener('DOMContentLoaded', function() {

	var tally = 25

	ElectionContract = web3.eth.contract(data.abi);
	var contractInstance = ElectionContract.at('0x3f0e43d47427e8848739aad887369352178bf0f4');

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
		console.log(tally)
		document.getElementById(`${candidate}-votes`).innerHTML = tally;
	};
});
