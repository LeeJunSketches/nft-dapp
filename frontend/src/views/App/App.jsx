import { useEffect, useState } from "react";
import Web3 from "web3";
import Page from "../../components/Layout/Page/Page";
import CardNFT from "../../components/Card/CardNFT";
import { NFTsData } from "./nft-data";
import "./App.scss";

function App() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_BLOCKCHAIN_URL)
  );
  const [NFTs, setNFTs] = useState([]);

  const getData = async () => {
    const promises = NFTsData.map(async ({ address, abi }) => {
      // We are considering unique token
      const id = 1;
      const nft = new web3.eth.Contract(abi, address);
      const name = await nft.methods.name().call();
      const symbol = await nft.methods.symbol().call();
      const owner = await nft.methods.ownerOf(id).call();
      const avatar = await nft.methods.tokenURI(id).call();
      // Fixed price in 1 eth
      // const price = (10 ** 18).toString(16);
      const price = 10 ** 18;

      return {
        id,
        name,
        symbol,
        owner,
        address,
        abi,
        avatar,
        price,
        description: "A nice description for this NFT! ;D",
      };
    });

    const response = await Promise.all(promises);
    setNFTs(response);
  };

  useEffect(() => {
    getData();
  }, []);

  const cards = NFTs.map(
    ({ id, name, symbol, owner, address, abi, avatar, price, description }) => {
      return (
        <CardNFT
          id={id}
          title={`${name} (${symbol})`}
          avatar={avatar}
          owner={owner}
          address={address}
          abi={abi}
          price={price}
          description={description}
          key={id}
        />
      );
    }
  );

  return (
    <Page>
      <div className="content">{cards}</div>
    </Page>
  );
}

export default App;
