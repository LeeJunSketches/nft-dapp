import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { setWallet } from "../../../store/user";
import { shortAddress } from "../../../utils/formatter";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

function HeaderBar() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.user.wallet);
  const navigate = useNavigate();

  const connect = async () => {
    const metamask = window.ethereum;
    const [account] = await metamask.request({
      method: "eth_requestAccounts",
    });
    dispatch(setWallet(account));
  };

  return (
    <div className="header-bar">
      <span className="logo">CustomNFT</span>

      <div className="buttons-wrapper">
        <Button className="button-primary" onClick={() => navigate("/create")}>
          New NFT
        </Button>

        <Button className="button-primary" onClick={connect}>
          {wallet ? shortAddress(wallet) : "Connect"}
        </Button>
      </div>
    </div>
  );
}

export default HeaderBar;
