const HDWalletProvider = require('@truffle/hdwallet-provider');
 const fs = require('fs');
 const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    binanceTestnet: {
      network_id:97,
      provider: () => new HDWalletProvider({
        privateKeys:[privateKey], 
        chainId:97,
        providerOrUrl:`https://data-seed-prebsc-1-s1.binance.org:8545/`
      }),
    },
   development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
   },
   test: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*"
   }
  },
  //
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1000
        },
        evmVersion: "istanbul"
       }
    }
  }
};
