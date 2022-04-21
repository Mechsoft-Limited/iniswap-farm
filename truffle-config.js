const HDWalletProvider = require('@truffle/hdwallet-provider');
 const fs = require('fs');
 const path = require('path');

 const privateKey = fs.readFileSync(".ganachesecret").toString().trim();
 const mnemonic = fs.readFileSync(path.join(__dirname,"../.ganachesecretMainet")).toString().trim();
 const BSCSCANAPIKEY = fs.readFileSync(path.join(__dirname,"../.bscscankey")).toString().trim();

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: BSCSCANAPIKEY
  },
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    binanceTestnet: {
      network_id:97,
      networkCheckTimeout: 999999,
      provider: () => new HDWalletProvider({
        privateKeys:[privateKey], 
        chainId:97,        
        providerOrUrl:`https://data-seed-prebsc-1-s1.binance.org:8545/`
      }),
    },
    binance: {
      network_id:56,
      networkCheckTimeout: 999999,
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,
      gasPrice:5000000000,
      websockets: true,
      provider: () => new HDWalletProvider(
        {
          privateKeys:[mnemonic], 
          chainId:56,         
         providerOrUrl:'https://bsc-dataseed1.defibit.io/'//`https://bsc-dataseed.binance.org/`
        }
        ),
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
          runs: 5000
        },
       // evmVersion: "istanbul"
       }
    }
  }
};
