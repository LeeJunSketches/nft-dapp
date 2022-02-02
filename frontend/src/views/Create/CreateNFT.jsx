import { useState } from "react";
import Page from "../../components/Layout/Page/Page";
import Button from "@mui/material/Button";
import { create as createIpfsClient } from "ipfs-http-client";
import { useSelector } from "react-redux";
import "./styles.scss";

function CreateNFT() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const wallet = useSelector((state) => state.user.wallet);

  const sign = async (payload) => {
    try {
      const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
      ];
      const nft = [
        { name: "name", type: "string" },
        { name: "description", type: "string" },
        { name: "price", type: "uint256" },
        { name: "imageUrl", type: "string" },
      ];

      const domainData = {
        name: "MyContract",
        version: 1,
        chainId: 1337,
        verifyingContract: "0x1c56346cd2a2bf3202f771f50d3d14a367b48070",
        salt: "0x43efba6b4ccb1b6faa2625fe562bdd9a23260359",
      };

      const data = JSON.stringify({
        types: {
          EIP712Domain: domain,
          nft,
        },
        domain: domainData,
        primaryType: "nft",
        message: payload,
      });

      const signed = await window.ethereum.request({
        method: "eth_signTypedData_v3",
        params: [wallet, data],
        from: wallet,
      });
      return signed;
    } catch (error) {
      console.log("!!!!!", error);
    }
  };

  const submit = async () => {
    const ipfsClient = createIpfsClient(process.env.REACT_APP_IPFS_URL);
    const addedImage = await ipfsClient.add(image);
    const imageUrl = `https://ipfs.infura.io/ipfs/${addedImage.path}`;

    const payload = {
      name,
      description,
      price,
      imageUrl,
    };

    const signature = await sign(payload);

    console.log("------------------------------------", signature);
  };

  return (
    <Page>
      <div className="form-wrapper">
        <div className="form">
          <div className="form-title">
            <span>Create a NFT</span>
          </div>
          <div className="form-item">
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-item">
            <span>Description</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-item">
            <span>Price</span>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-item">
            <span>Image</span>
            <label htmlFor="image-input" className="container">
              <div className="dropzone">
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </label>
            <input
              type="file"
              id="image-input"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <aside>
              {image && (
                <li key={image.name}>
                  {image.name} - {image.size} bytes
                </li>
              )}
            </aside>
          </div>
          <Button variant="outlined" onClick={submit}>
            SUBMIT
          </Button>
        </div>
      </div>
    </Page>
  );
}

export default CreateNFT;
