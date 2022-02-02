import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import Page from "../../components/Layout/Page/Page";
import CardNFT from "../../components/Card/CardNFT";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import CreateNFT from "../Create/CreateNFT";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateNFT />} />
    </Routes>
  );
}

export default App;
