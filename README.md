# Deblocracy

## How to Run

#### Before including migration
Before migration, one needed to deploy a new contract (in many tedious steps) each instance the solidity file changed. These steps can be revised in [our wiki](https://github.com/RSijelmass/votingchain/wiki/How-we-deployed-before-Migration).

This made us consider a less horendous UX.

#### After including migration
Unfortunately, migration is only possible when truffle initialises webpack. Even more unfortunate is that this can only happen in an empty directory. Therefore if anyone is interested copying our work on their local computer, the following steps have to be taken:

```
mkdir new_directory
cd new_directory
npm init
npm install -g ethereumjs-testrpc web3
npm install -g truffle webpack
truffle init webpack

rm contracts/MetaCoin.sol contracts/ConvertLib.sol app/javascripts/app.js test/metacoin.js test/TestMetacoin.sol migrations/2_deploy_contracts.js
rm -rf ./app

cp ../contracts/Election.sol ./contracts/Election.sol
cp ../test/election.js ./test/election.js
cp ../migrations/2_deploy_contracts.js ./migrations/2_deploy_contracts.js
cp -r ../app ./
```

On a separate terminal (in same directory), run:
`node_modules/.bin/testrpc`

On your previous terminal, run:
```
truffle test (all should pass)
truffle compile
truffle migrate
npm run dev
```

On your localhost:8080, the app should now be launched.

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

## Tech Stack

Section | Language / Framework
------- | -------------------
Database | Ethereum / testrpc
Back-end | Solidity
Front-end | Javascript / JQuery / Web3
Testing | Truffle


## User Stories

MVP:
```
As an Admin,
So that I can gauge opinion
I want to create an election
```
```
As a User,
So that I can choose between two options
I want to cast a vote
```
```
As an Admin,
So that I can retrieve the results of an election
I want to be able to tally all votes cast
```


## Charter

A set of practices agreed upon before starting our project. But, above anything else:

*"Well being is always over product and individual technical preferences."*

```
1. No person left behind
2. Consistent, constructive, honest feedback & retros
3. Team checkin in retros
4. All code is everyone’s code
5. We discuss swapping pairs each day
6. No specialisation, everyone is full stack
7. Define the priorities of the user stories
8. Define project priorities together
9. Have strong opinions but hold them loosely
10. Disagree and commit: have a clear process of dealing with disagreements, use consensus-consent-command
11. Have fun & stay friends- nothing’s personal
12. No one has a monopoly over the project
13. Constant documentation of process & learnings on a wiki
14. No tests no code
15. Use a spike as inspiration - not as a code base
16. Only reviewed code gets pushed to Master
17. The role of facilitator is rotated daily
```

## Problem to be Solved
The aim of the project is **to make voting more decentralised**. Secondary goals, in turn, will be to make voting more
accessible, transparent and accurate.

Blockchain could solve this debacle. This is because with blockchain:
- Security is in its openness: it's controlled by everyone and no-one
- It can't be corrupted; trusting the 51% majority
- Anonimity (for both the users and the miners) takes away the lack of confidence and danger behind voting
- Being online, its accessibility increases

*After brainstorming, these problems arose debating the downsides of the current voting system:*
-  *not many people go out to vote*
- *Not many people register*
- *People can’t vote because polling stations are far away (e.g. US)*
- *Constrained choice on the ballot - a Yes / No referendum gives little indication of nuanced ideologies*
- *Disillusion about voting*
- *Order of candidates is always the same*
- *Not safe to vote (e.g. Venezuala)*
- *Voting easy to influence*
- *Lack of confidence in voting system*
- *Paper system in 2017*
- *Expensive to count votes*
- *Large margin of human error*





## Context

This application was developed over an 8-day period by a team of 6 developers, as a final project for the Makers Academy bootcamp.

None of the team members had previous experience using blockchain, smart contracts, Solidity or Truffle.

Lessons Learned


A number of resources were used to assist us during the build process:
* [Solidity Documentation](https://solidity.readthedocs.io/en/develop/)
* [Truffle Framework Documentation](http://truffleframework.com/docs/)
* [Tutorials Written by Mahesh Murthy](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) [@mvmurthy](https://twitter.com/mvmurthy) (and thanks for the Ether!)
