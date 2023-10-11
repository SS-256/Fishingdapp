// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface ERC20 {
    
     /**
     * @dev returns the tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

     /**
     * @dev returns the decimal places of a token
     */
    function decimals() external view returns (uint8);

    /**
     * @dev transfers the `amount` of tokens from caller's account
     * to the `recipient` account.
     *
     * returns boolean value indicating the operation status.
     *
     * Emits a {Transfer} event
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
 
}

contract Fishing {
    
    // The underlying token of the fish
    ERC20 token;
    
    // The address of the fish owner
    address owner;
    
    // For rate limiting
    mapping(address=>uint256) nextRequestAt;
    
    // No.of tokens to send when requested
    uint256 fishDripAmount = 1;
    
    // Sets the addresses of the Owner and the underlying token
    constructor (address _fishAddress, address _ownerAddress) {
        token = ERC20(_fishAddress);
        owner = _ownerAddress;
    }   
    
    // Verifies whether the caller is the owner 
    modifier onlyOwner{
        require(msg.sender == owner,"fishError: Caller not owner");
        _;
    }
    
    // Sends the amount of token to the caller.
    function send() external {
        require(token.balanceOf(address(this)) > 1,"fishError: Empty");
        require(nextRequestAt[msg.sender] < block.timestamp, "fishError: Try again later");
        
        // Next request from the address can be made only after 5 minutes         
        nextRequestAt[msg.sender] = block.timestamp + (5 minutes); 
        
        token.transfer(msg.sender,fishDripAmount * 10**token.decimals());
    }  
    
    // Updates the underlying token address
     function setTokenAddress(address _tokenAddr) external onlyOwner {
        token = ERC20(_tokenAddr);
    }    
    
    // Updates the drip rate
     function setfishDripAmount(uint256 _amount) external onlyOwner {
        fishDripAmount = _amount;
    }  
     
     
     // Allows the owner to withdraw tokens from the contract.
     function withdrawTokens(address _receiver, uint256 _amount) external onlyOwner {
        require(token.balanceOf(address(this)) >= _amount,"fishError: Insufficient funds");
        token.transfer(_receiver,_amount);
    }    
}