import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { setWallet } from "../../../store/user";
import { shortAddress } from "../../../utils/formatter";
import "./styles.scss";

function HeaderBar() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.user.wallet);

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
      <Button className="button-primary" onClick={connect}>
        {wallet ? shortAddress(wallet) : "Connect"}
      </Button>
    </div>
  );
}

export default HeaderBar;
