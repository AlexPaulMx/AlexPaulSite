// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TheLabNFT.sol";

contract TheLabDonations is Ownable {
    TheLabNFT public nftContract;
    uint256 public minimumDonation;
    string public nftTokenURI;
    IERC20 public usdcToken;
    uint256 public minimumUsdcDonation;
    address public constant recipient = 0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8;

    event DonationReceived(address indexed donor, uint256 amount, string currency);
    event UsdcDonationReceived(address indexed donor, uint256 amount);
    event NFTMinted(address indexed donor, uint256 tokenId);
    event NFTMintError(address indexed donor, string reason);

    constructor(
        address _nftContract,
        uint256 _minimumDonation,
        string memory _nftTokenURI,
        address _usdcToken,
        uint256 _minimumUsdcDonation
    ) Ownable(msg.sender) {
        nftContract = TheLabNFT(_nftContract);
        minimumDonation = _minimumDonation;
        nftTokenURI = _nftTokenURI;
        usdcToken = IERC20(_usdcToken);
        minimumUsdcDonation = _minimumUsdcDonation;
    }

    // Función para recibir donaciones en ETH
    receive() external payable {
        require(msg.value >= minimumDonation, "Donation amount too low");
        // Transferir ETH inmediatamente al destinatario
        (bool sent, ) = recipient.call{value: msg.value}("");
        require(sent, "Failed to send ETH to recipient");
        // Mintear NFT al donante (try/catch para evitar revert global)
        try nftContract.mintToDonor(msg.sender, nftTokenURI) returns (uint256 tokenId) {
            emit NFTMinted(msg.sender, tokenId);
        } catch Error(string memory reason) {
            emit NFTMintError(msg.sender, reason);
        } catch {
            emit NFTMintError(msg.sender, "Unknown error");
        }
        emit DonationReceived(msg.sender, msg.value, "ETH");
    }

    // Función para recibir donaciones en USDC
    function donateUsdc(uint256 amount) external {
        require(amount >= minimumUsdcDonation, "USDC donation amount too low");
        // Transferir USDC al destinatario
        require(usdcToken.transferFrom(msg.sender, recipient, amount), "USDC transfer failed");
        // Mintear NFT al donante (try/catch para evitar revert global)
        try nftContract.mintToDonor(msg.sender, nftTokenURI) returns (uint256 tokenId) {
            emit NFTMinted(msg.sender, tokenId);
        } catch Error(string memory reason) {
            emit NFTMintError(msg.sender, reason);
        } catch {
            emit NFTMintError(msg.sender, "Unknown error");
        }
        emit DonationReceived(msg.sender, amount, "USDC");
    }

    // Función para que el owner pueda retirar los fondos
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Función para que el owner pueda retirar USDC
    function withdrawUsdc() external onlyOwner {
        uint256 balance = usdcToken.balanceOf(address(this));
        require(usdcToken.transfer(owner(), balance), "USDC transfer failed");
    }

    // Función para actualizar el mínimo de donación en ETH
    function setMinimumDonation(uint256 _minimumDonation) external onlyOwner {
        minimumDonation = _minimumDonation;
    }

    // Función para actualizar el mínimo de donación en USDC
    function setMinimumUsdcDonation(uint256 _minimumUsdcDonation) external onlyOwner {
        minimumUsdcDonation = _minimumUsdcDonation;
    }

    // Función para actualizar la URI del NFT
    function setNFTTokenURI(string memory _nftTokenURI) external onlyOwner {
        nftTokenURI = _nftTokenURI;
    }
} 