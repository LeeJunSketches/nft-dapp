const MyNFT = artifacts.require("MyNFT");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(MyNFT);
  const nft = await MyNFT.deployed();
  nft.mintNFT(accounts[0], "https://www.infomoney.com.br/wp-content/uploads/2021/12/GettyImages-1351160965-1.jpg?fit=788%2C443&quality=50&strip=all");
};