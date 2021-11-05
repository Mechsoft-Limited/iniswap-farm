const mockBep20 = artifacts.require('MockBEP20');


const fs = require('fs');
const path = require('path');
const ethers = require("ethers")
const supply = "500000000000000000000000000"//ethers.utils.formatUnits("500000000000000000000000000",'18')
console.log(`Deploying MockBEP20 with supply ${supply.toString()}`)

module.exports = async function(deployer, network, accounts) {
    
 await  deployer.deploy(mockBep20,"Ini Token","INI",supply);
const contract = await mockBep20.deployed();
fs.writeFileSync(path.join(__dirname, '../mockbep.txt'), contract.address);
};
