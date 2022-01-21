import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import "./style.scss";
import Button from "@mui/material/Button";
import { marketNFT } from "../../protocols/MarketNFT";

function CardNFT(props) {
  const wallet = useSelector((state) => state.user.wallet);
  const isConnected = Boolean(wallet);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_BLOCKCHAIN_URL)
  );

  const buy = async () => {
    try {
      const { abi, address: marketAddress } = marketNFT;
      const nft = new web3.eth.Contract(abi, marketAddress);
      const options = {
        from: wallet,
        value: props.price,
        gas: 5000000,
      };
      const response = await nft.methods
        .buy(props.address, props.id)
        .send(options);

      console.log("Purchase was successful", response);
    } catch (error) {
      console.log("**********************", error.data);
    }
  };

  return (
    <div className="card-nft">
      <div className="card-nft__avatar">
        <img src={props.avatar} />
      </div>
      <div className="card-nft__info">
        <div className="info__title">
          <span className="info-label">Title: </span>
          <span>{props.title}</span>
        </div>
        <div className="info__description">
          <span className="info-label">Description: </span>
          <span>{props.description}</span>
        </div>
        <div className="info__owner">
          <span className="info-label">Owner: </span>
          <span>{props.owner}</span>
        </div>
        <Button
          className="button-primary"
          disabled={!isConnected}
          onClick={buy}
        >
          BUY
        </Button>
      </div>
    </div>
  );
}

export default CardNFT;
