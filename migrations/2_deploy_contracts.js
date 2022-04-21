
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
const supply = "1000000000000000000000000000"
//let INI_ADDRESS = "0x8c3D557E4C548612529D30763420f3C6E7bcfaDA"
const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";//"0xae13d989dac2f0debff460ac112a837c89baa7cd";

const strtBlock=17047970 + 1000; 
const iniPerBlock='1000'
module.exports = async function(deployer, network, accounts) {
  // block = await ethers.provider.getBlockNumber();
   debugger
   //await deployer.deploy(SafeMath);//0x261093aeed3c295bbf63bc9a3e6b50d9d8101ee7
   const safeMath = await SafeMath.at('0x261093aeed3c295bbf63bc9a3e6b50d9d8101ee7');
   //await deployer.deploy(SafeBEP20);//0xc0cbf798fd1f5c22cbc556eb688fd3a89f3fa366
   const safeBEP20 = await SafeBEP20.at('0xc0cbf798fd1f5c22cbc556eb688fd3a89f3fa366');
   await deployer.link(safeMath, [ IniToken, MasterChef, SauceBar]);
   await deployer.link(safeBEP20, [ IniToken, MasterChef, SauceBar]);

  // await  deployer.deploy(IniToken,{from:accounts[0],});
   //const iniToken = await IniToken.deployed();//0x4EFB710AB24396c29d2313B3518dA6BDc2F5c53d
   const iniToken = await IniToken.at('0x4EFB710AB24396c29d2313B3518dA6BDc2F5c53d');
   //await iniToken.mint(accounts[0],supply);
  // fs.writeFileSync(path.join(__dirname, '../iniToken.txt'), iniToken.address);
   const INI_ADDRESS = '0x4EFB710AB24396c29d2313B3518dA6BDc2F5c53d'//iniToken.address;
   //  await  deployer.deploy(MultiCall);
   // const multiCall = await MultiCall.deployed();
    //
   // await deployer.deploy(SauceBar,INI_ADDRESS);//0xc7e6abd8356257f13458790222729ec4e4b433b4
    const sauceBar = await SauceBar.at('0xc7e6abd8356257f13458790222729ec4e4b433b4');//0xc7e6abd8356257f13458790222729ec4e4b433b4
   const SOUCE_ADDRESS = '0xc7e6abd8356257f13458790222729ec4e4b433b4';

    // masterchef 
   //await deployer.deploy(MasterChef,INI_ADDRESS,SOUCE_ADDRESS,accounts[0],iniPerBlock,`${strtBlock}`);//0x97f30C9acb7d8C53d306C858F560C9135E10D674
    const masterChef = await MasterChef.at('0x97f30C9acb7d8C53d306C858F560C9135E10D674');
  // await iniToken.transferOwnership(masterChef.address);
  // await sauceBar.transferOwnership(masterChef.address);

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