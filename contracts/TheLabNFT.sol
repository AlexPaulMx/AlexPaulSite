// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TheLabNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    
    string private _description;
    string private _baseTokenURI;
    address public donationContract;

    event NFTMinted(address indexed to, uint256 indexed tokenId);

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        string memory description
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
        _description = description;
    }

    // Función para establecer el contrato de donaciones
    function setDonationContract(address _donationContract) external onlyOwner {
        donationContract = _donationContract;
    }

    // Función para mintear NFT a un donante
    function mintToDonor(address donor, string memory tokenURI) external returns (uint256) {
        require(msg.sender == donationContract, "Only donation contract can mint");
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(donor, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit NFTMinted(donor, newItemId);
        return newItemId;
    }

    // Función para que el owner pueda mintear (útil para pruebas o regalos especiales)
    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit NFTMinted(recipient, newItemId);
        return newItemId;
    }

    function getDescription() public view returns (string memory) {
        return _description;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
} 