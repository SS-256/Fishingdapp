// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FishGame {
    address public owner;
    uint256 public normalRodPrice = 0.1 ether;
    uint256 public superRodPrice = 1.0 ether;

    mapping(address => uint256) public rodOwners; // ロッドを購入したアドレスとロッドのタイプ（0: 未購入, 1: NormalRod, 2: SuperRod）

    event FishCaught(address indexed fisherman, uint256 fishSize, uint256 ethReward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // 0.1ETHでNormalRodを購入
    function buyRod() external payable {
        require(msg.value >= normalRodPrice, "Insufficient payment");
        require(rodOwners[msg.sender] == 0, "Rod already purchased");
        rodOwners[msg.sender] = 1; // 1: NormalRod
    }

    // 1.0ETHでSuperRodを購入
    function buySuperRod() external payable {
        require(msg.value >= superRodPrice, "Insufficient payment");
        require(rodOwners[msg.sender] == 0, "Rod already purchased");
        rodOwners[msg.sender] = 2; // 2: SuperRod
    }

    // 魚を釣る関数
    function goFishing() external {
        // 適切なランダムな魚のサイズと報酬を生成するロジックを実装

        uint256 fishSize = 5; // 仮のサイズ（ランダムな値に置き換える）
        uint256 ethReward = 3 ether; // 3ETHの報酬

        emit FishCaught(msg.sender, fishSize, ethReward);
    }

    // ログインしているアカウントのETH残高を取得
    function getAccountBalance() external view returns (uint256) {
        return msg.sender.balance;
    }

    // アカウントが購入したロッドのタイプを取得
    function getRodType(address account) external view returns (uint256) {
        return rodOwners[account];
    }
}
