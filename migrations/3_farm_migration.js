const fs = require('fs');
const path = require('path');
const ethers = require("ethers")

const VoterProxy = artifacts.require('IniVoterProxy')
const MultiCall = artifacts.require('Multicall')
const BnbStaking = artifacts.require('BnbStaking')
const IniToken  = artifacts.require('IniToken')
const LotteryRewardPool = artifacts.require('LotteryRewardPool')
const MasterChef = artifacts.require('MasterChef')
const SauceBar = artifacts.require('SauceBar')
const SousChef = artifacts.require('SousChef')
const Timelock = artifacts.require('Timelock')
const INI_ADDRESS = "0x8c3D557E4C548612529D30763420f3C6E7bcfaDA"
const WBNB = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
const block = 13961943 // 9/11/21 @ 17:45

module.exports = async function(deployer, network, accounts) {
    
    await  deployer.deploy(MultiCall);
   const multiCall = await MultiCall.deployed();
    //
    await deployer.deploy(SauceBar,INI_ADDRESS);
    const sauceBar = await SauceBar.deployed();

    // 
   await deployer.deploy(MasterChef,INI_ADDRESS,sauceBar.address,accounts[0],'1000',`${block+(5*300)}`);
   const masterChef = await MasterChef.deployed();
   //

   await deployer.deploy(SousChef,sauceBar.address,'40', `${block+(5*300)}`, `${block+(5*30000)}`);
   const sousChef = await SousChef.deployed();

   //BNB staking
     await deployer.deploy(BnbStaking,WBNB,INI_ADDRESS,'1000',`${block+(5*300)}`, `${block+(5*30000)}`,accounts[0],WBNB);
    const bnbStaking = await BnbStaking.deployed();
   //
   await deployer.deploy(LotteryRewardPool,masterChef.address,INI_ADDRESS,accounts[0],accounts[0]);
   const lotteryRewardPool = await LotteryRewardPool.deployed();
   
  

//
   await deployer.deploy(Timelock,accounts[0],'28800');
   const timelock = await Timelock.deployed();
   
   const addresses = `
   bnbstaking: ${BnbStaking.address}
   masterchef: ${masterChef.address}
   multicall: ${multiCall.address}
   saucebar: ${sauceBar.address}
   souschef: ${sousChef.address}
   lottery: ${lotteryRewardPool.address}
   timelock: ${timelock.address}
   `
   fs.writeFileSync(path.join(__dirname, '../addresses.txt'), addresses);
   };