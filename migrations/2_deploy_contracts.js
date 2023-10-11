const FishToken = artifacts.require("FishToken");
const FishingGame = artifacts.require("FishingGame");
const Fishing = artifacts.require("Fishing"); // 追加：Fishing.sol の名前を正しく指定する

module.exports = async function (deployer) {
  // FishToken コントラクトをデプロイ
  await deployer.deploy(FishToken);
  const fishTokenInstance = await FishToken.deployed();

  // FishingGame コントラクトをデプロイし、FishToken コントラクトのアドレスを渡します
  await deployer.deploy(FishingGame, fishTokenInstance.address);
  const fishingGameInstance = await FishingGame.deployed();

  // Fishing コントラクトをデプロイし、FishToken コントラクトと FishingGame コントラクトのアドレスを渡します
  await deployer.deploy(Fishing, fishTokenInstance.address, fishingGameInstance.address);
};
