'use strict';

const SignerProvider = require('ethjs-provider-signer');
const ethSigner = require('ethjs-signer')

let liveProviderURL = "http://.......:8545"

let provider = new SignerProvider(liveProviderURL, {
  signTransaction: (rawTx, cb) => {
    // console.log(rawTx)
    cb(null, ethSigner.sign(rawTx, '0x8........'))
  }
});

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      host: "......",
      port: 8545,
      network_id: 1,        // Ethereum public network
      // optional config values
      gas: 280000,
      // gasPrice
      from: "0x0.........",// - default address to use for any transaction Truffle makes during migrations
      provider: provider
    }
  }
};
