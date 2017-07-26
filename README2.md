Deblocracy
==========

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
The aim of the project is **to make voting more decentralised**. Secondary goals, in turn, will be to make voting more: 
- accessible 
- transparent 
- accurate

Blockchain could solve this debacle. This is because with blockchain:
- Security is in its openness: it's controlled by everyone and no-one
- It can't be corrupted; trusting the 51% majority
- Anonimity (for both the users and the miners) takes away the lack of confidence and danger behind voting
- Being online, its accessibility increases

*After brainstorming, these problems arose debating the downsides of the current voting system:*
* not many people go out to vote 
* Not many people register 
* People can’t vote because polling stations are far away (e.g. US)
* Constrained choice on the ballot - a Yes / No referendum gives little indication of nuanced ideologies
* Disillusion about voting 
* Order of candidates is always the same 
* Not safe to vote (e.g. Venezuala)
* Voting easy to influence 
* Lack of confidence in voting system 
* Paper system in 2017 
* Expensive to count votes 
* Large margin of human error 

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

## Tech Stack

Section | Language / Framework
------- | -------------------
Database | Ethereum
Back-end | Solidity
Front-end | Javascript / JQuery / Web3
Testing | Truffle
