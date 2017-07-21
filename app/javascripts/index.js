web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// console.log(data)
// abi = JSON.parse(data);
// console.log(abi)

var json=JSON.stringify(data);
var abi=JSON.parse(json)

ElectionContract = web3.eth.contract(abi);
contractInstance = ElectionContract.at('0x10922319451f069ad592b3bbee4489821e85cc81');
candidates = {"yes": "yes", "no": "no"}


function voteYes() {
  document.getElementById("msg").innerHTML = "YOU VOTED YAASSSSSS"
}
