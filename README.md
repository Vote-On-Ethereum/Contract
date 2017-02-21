# Contract
The voting contract source code in [Solidity](http://solidity.readthedocs.io/en/latest/).

## Dependencies

- [Truffle](http://truffleframework.com) as a development framework
- [Zeppelin](https://openzeppelin.org) for reusable contracts
- [Testrpc](https://github.com/ethereumjs/testrpc) for local development blockchain

## Install

```console
npm install -g truffle
npm install -g ethereumjs-testrpc
npm install
```


## Start the development blockchain

Execute in a separate terminal

```console
testrpc
```

Note that it gives you a list of accounts with their private key. You may need them.

## Test

```console
truffle test ./test/poll.js
```

## Compile

```console
truffle compile
```

The compiled contract (.json) will be created in `./build/contracts`

## Deploy

- Development network

```console
truffle migrate --reset
```

`--reset` is usefull to force the contract to deploy

- Live network (need a sync rpc-enabled node)

```console
truffle migrate --reset --network live
```

