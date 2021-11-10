require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const utils = require('web3-utils')
const mnemonic = process.env.MNEMONIC

module.exports = {
  networks: {
    testnet: {
      provider: () => {
        return new HDWalletProvider({ 
          mnemonic,
          providerOrUrl: 'https://api.s0.b.hmny.io', // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666700000, // 1666600000 for mainnet
    },

    mainnet: {
      provider: () => {
        return new HDWalletProvider({ 
          mnemonic,
          providerOrUrl: 'https://api.s0.t.hmny.io',
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gas: 4000000,
      network_id: 1666600000,
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.5.17',    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        // evmVersion: "byzantium"
      }
    },
    external: {
      command: 'node ./compileHasher.js',
      targets: [{
        path: './build/Hasher.json'
      }]
    }
  }
}