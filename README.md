# Deblocracy

## Purpose
The Deblocracy application is an implementation of a decentralised voting system using smart contract and blockchain technology.

A voting system that uses smart contracts on top of blockchain technology can be thought of as a ledger of cast votes which is decentralised - stored by any number of users of the system. Every vote cast is added to the blockchain and distributed among all users.

In terms of a voting application, the implications of this include:
* No one person or organisation is solely responsible for voting data, and no one person or organisation has total knowledge or control over it.
* A user does not have to go through any intermediary to make a vote.
* A user can verify that their vote has been cast, and cast in the intended direction.
* The ability for any individual or organisation to influence or 'hack' the voting system is reduced due to decentralisation of data.

Developing a decentralised voting system requires the use of smart contracts. Each contract is a set of instructions which are deployed to the blockchain and executed under certain circumstances. Our election smart contract is written to execute a vote as a transaction on the blockchain every time a user logs on and casts a vote.

The following image describes the steps to develop and deploy and Election contract. The steps can be summarised as follows:
* Write the contract (i.e. the structures of the election and functions that can be called)
* Compile the contract so the application can read it
* Push the compiled contract on to the blockchain
* Provide the application with the location of the contract on the blockchain
* Execute the structures and functions of the contract through the application's front end

![Diagram](images/Screen Shot 2017-07-26 at 11.30.54.png?raw=true)


## Context

This application was developed over an 8-day period by a team of 6 developers, as a final project for the Makers Academy bootcamp.

None of the team members had previous experience using blockchain, smart contracts, Solidity or Truffle.

Lessons Learned
* 

A number of resources were used to assist us during the build process:
* [Solidity Documentation](https://solidity.readthedocs.io/en/develop/)
* [Truffle Framework Documentation](http://truffleframework.com/docs/)
* [Tutorials Written by Mahesh Murthy](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) [@mvmurthy](https://twitter.com/mvmurthy)(and thanks for the Ether!)
*
