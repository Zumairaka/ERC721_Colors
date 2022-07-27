const { assert } = require('chai');

const DaiToken = artifacts.require('DaiToken');
const DappToken = artifacts.require('DappToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
  .use(require('chai-as-promised'))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([investor, owner]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(daiToken.address, dappToken.address);
    dappToken.transfer(tokenFarm.address, tokens('1000000'));
    daiToken.transfer(investor, tokens('100'), { from: owner });
  })

  describe('Mock DAI deployment', async () => {
    it('has a name', async () => {      
      const name = daiToken.name();
      assert.equal(name, 'Mock DAI token');
    });
  });
});