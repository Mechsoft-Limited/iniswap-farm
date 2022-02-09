
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
const SafeMath = artifacts.require('SafeMath')
const SafeBEP20 = artifacts.require('SafeBEP20');
const supply = "500000000000000000000000000"
//let INI_ADDRESS = "0x8c3D557E4C548612529D30763420f3C6E7bcfaDA"
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";//"0xae13d989dac2f0debff460ac112a837c89baa7cd";
const refBlock = 15087933; // block number at 2022-02-08 22:14:45 utc
const refBlockTime = 1644358485;
const blockTimeToStart = 1646092800 // Tue Mar 01 2022 00:00:00 GMT+0000
const blockTimeSpaned = (((new Date()).getTime()/1000)-refBlockTime);
const strtBlock=refBlock + Math.ceil((blockTimeToStart-blockTimeSpaned)/3); 
const iniPerBlock='1000'
module.exports = async function(deployer, network, accounts) {
  // block = await ethers.provider.getBlockNumber();
   debugger
   await deployer.deploy(SafeMath);
   await deployer.deploy(SafeBEP20);
   await deployer.link(SafeMath, [BnbStaking, IniToken, LotteryRewardPool, MasterChef, SauceBar, SousChef, Timelock]);
   await deployer.link(SafeBEP20, [BnbStaking, IniToken, LotteryRewardPool, MasterChef, SauceBar, SousChef, Timelock]);

   await  deployer.deploy(IniToken,{from:accounts[0],});
   const iniToken = await IniToken.deployed();
   await iniToken.mint(accounts[0],supply);
  // fs.writeFileSync(path.join(__dirname, '../iniToken.txt'), iniToken.address);
   const INI_ADDRESS = iniToken.address;
   //  await  deployer.deploy(MultiCall);
   // const multiCall = await MultiCall.deployed();
    //
    await deployer.deploy(SauceBar,INI_ADDRESS);
    const sauceBar = await SauceBar.deployed();

    // masterchef 
   await deployer.deploy(MasterChef,INI_ADDRESS,sauceBar.address,accounts[0],iniPerBlock,`${strtBlock}`);
   const masterChef = await MasterChef.deployed();
   await iniToken.transferOwnership(masterChef.address);
   await sauceBar.transferOwnership(masterChef.address);

   // souschef
  // await deployer.deploy(SousChef,sauceBar.address,'40', `${block+(5*300)}`, `${block+(5*30000)}`);
  // const sousChef = await SousChef.deployed();

   //BNB staking
  //  await deployer.deploy(BnbStaking,WBNB,INI_ADDRESS,'1000',`${block+(5*300)}`, `${block+(5*30000)}`,accounts[0],WBNB);
  //  const bnbStaking = await BnbStaking.deployed();
   
    // lottery reward pool
  // await deployer.deploy(LotteryRewardPool,masterChef.address,INI_ADDRESS,accounts[0],accounts[0]);
  // const lotteryRewardPool = await LotteryRewardPool.deployed();
   
  

//  Timelock
//   await deployer.deploy(Timelock,accounts[0],'28800');
 //  const timelock = await Timelock.deployed();
   
   const addresses = `
   initoken: ${INI_ADDRESS}
   bnbstaking: {bnbStaking.address}
   masterchef: ${masterChef.address}  
   saucebar: ${sauceBar.address}
   souschef: {sousChef.address}
   lottery: {lotteryRewardPool.address}
   timelock: {timelock.address}
   `
   fs.writeFileSync(path.join(__dirname, `../${network}_addresses.txt`), addresses);
   };