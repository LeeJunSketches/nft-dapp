const MyNFT = artifacts.require("MyNFT");
const MarketNFT = artifacts.require("MarketNFT");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(MarketNFT);
  const nft = await MyNFT.deployed();
  const market = await MarketNFT.deployed();

  nft.approve(market.address, 1);
  market.addNFT(nft.address, 1);
};