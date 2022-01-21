// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MarketNFT {
    mapping(address => uint256[]) private approvedNFTs;

    function _isApproved(address _nft, uint256 _id)
        private
        view
        returns (bool)
    {
        uint256[] memory ids = approvedNFTs[_nft];
        uint256 len = ids.length;
        for (uint256 i; i < len; i++) {
            if (ids[i] == _id) return true;
        }
        return false;
    }

    function addNFT(address _nft, uint256 _id) public returns (bool) {
        IERC721 nft = IERC721(_nft);
        require(nft.getApproved(_id) == address(this));
        approvedNFTs[_nft].push(_id);
        return true;
    }

    function buy(address _nft, uint256 _id) public payable returns (bool) {
        require(msg.value == 1 ether, "NFT costs 1 ether");
        require(_isApproved(_nft, _id));
        address to = msg.sender;
        IERC721 nft = IERC721(_nft);
        address owner = nft.ownerOf(_id);
        nft.safeTransferFrom(owner, to, _id);
        payable(address(owner)).transfer(1 ether);
        return true;
    }
}
