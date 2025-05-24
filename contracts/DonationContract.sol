// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TheLabNFT.sol";

contract DonationContract is Ownable {
    IERC20 public usdcToken;
    TheLabNFT public nftContract;
    
    address public projectWallet;
    uint256 public totalDonations;
    
    // Mapping to track donations per address
    mapping(address => uint256) public donations;
    
    // Events
    event DonationReceived(address indexed donor, uint256 amount, uint256 nftTokenId);
    event NFTMinted(address indexed donor, uint256 tokenId);
    
    constructor(
        address _usdcToken,
        address _nftContract,
        address _projectWallet
    ) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
        nftContract = TheLabNFT(_nftContract);
        projectWallet = _projectWallet;
    }
    
    function donate(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        
        // Transfer USDC from donor to contract
        require(
            usdcToken.transferFrom(msg.sender, address(this), amount),
            "USDC transfer failed"
        );
        
        // Transfer USDC to project wallet
        require(
            usdcToken.transfer(projectWallet, amount),
            "USDC transfer to project wallet failed"
        );
        
        // Update donation tracking
        donations[msg.sender] += amount;
        totalDonations += amount;
        
        // Mint NFT if donor hasn't received one yet
        uint256 nftTokenId = 0;
        if (!nftContract.hasReceivedNFT(msg.sender)) {
            nftTokenId = nftContract.mintNFT(msg.sender);
            emit NFTMinted(msg.sender, nftTokenId);
        }
        
        emit DonationReceived(msg.sender, amount, nftTokenId);
    }
    
    function getDonationAmount(address donor) external view returns (uint256) {
        return donations[donor];
    }
    
    function updateProjectWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet address");
        projectWallet = _newWallet;
    }
    
    function updateNFTContract(address _newNFTContract) external onlyOwner {
        require(_newNFTContract != address(0), "Invalid NFT contract address");
        nftContract = TheLabNFT(_newNFTContract);
    }
} 