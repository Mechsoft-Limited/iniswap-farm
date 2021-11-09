const { advanceBlockTo } = require('@openzeppelin/test-helpers/src/time');
const { assert } = require('chai');
const IniToken = artifacts.require('IniToken');
const SauceBar = artifacts.require('SauceBar');

contract('SauceBar', ([alice, bob, carol, dev, minter]) => {
  beforeEach(async () => {
    this.cake = await IniToken.new({ from: minter });
    this.sauce = await SauceBar.new(this.cake.address, { from: minter });
  });

  it('mint', async () => {
    await this.sauce.mint(alice, 1000, { from: minter });
    assert.equal((await this.sauce.balanceOf(alice)).toString(), '1000');
  });

  it('burn', async () => {
    await advanceBlockTo('650');
    await this.sauce.mint(alice, 1000, { from: minter });
    await this.sauce.mint(bob, 1000, { from: minter });
    assert.equal((await this.sauce.totalSupply()).toString(), '2000');
    await this.sauce.burn(alice, 200, { from: minter });

    assert.equal((await this.sauce.balanceOf(alice)).toString(), '800');
    assert.equal((await this.sauce.totalSupply()).toString(), '1800');
  });

  it('safeIniTransfer', async () => {
    assert.equal(
      (await this.cake.balanceOf(this.sauce.address)).toString(),
      '0'
    );
    await this.cake.mint(this.sauce.address, 1000, { from: minter });
    await this.sauce.safeIniTransfer(bob, 200, { from: minter });
    assert.equal((await this.cake.balanceOf(bob)).toString(), '200');
    assert.equal(
      (await this.cake.balanceOf(this.sauce.address)).toString(),
      '800'
    );
    await this.sauce.safeIniTransfer(bob, 2000, { from: minter });
    assert.equal((await this.cake.balanceOf(bob)).toString(), '1000');
  });
});
