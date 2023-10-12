const contractAddress = '0x4B284c037A8c8A02A484645892073C53B6E846B3';
const contractABI =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "fisherman",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fishSize",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethReward",
        "type": "uint256"
      }
    ],
    "name": "FishCaught",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "normalRodPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rodOwners",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "superRodPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyRod",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buySuperRod",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "goFishing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAccountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getRodType",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let accountBalance = 0;
let Rodtype = 0;
let tokenBalance = 0; // Set initial token balance to 0
var imageContainer = document.getElementById('imageContainer');
document.getElementById("Fish").disabled = true;
document.getElementById("NormalRod").disabled = true;
document.getElementById("SuperRod").disabled = true;
const account0 = "0x5C5fC0C71B3dbA48dB11cE94fab9DAb2fc6275A9";
const account1 = "0x94da82206297Ce34fb00DA086FAA8b4ae4b61663";
const account2 = "0xbC23F450c480E56115aA36d7970F900a772eDA21";
const account3 = "0xB5283d367186246d612a7B95bCa851Dfea6bec4A";
let selectedAddress = '' //アカウントのアドレス
let overlappingFish = null; //重なっている魚
const accountSelect = document.getElementById('accountSelect');
// let NormalRodPrice = 0.1;
// let SuperRodPrice = 1.0;

// Initialize web3 provider
window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    //const accounts = await web3.eth.getAccounts();
    loadAccountBalance();
    // displayTokenBalance();
  } else {
    console.log('Web3 provider not found. Please install MetaMask.');
  }

 
});

const accountData = {
  "0x5C5fC0C71B3dbA48dB11cE94fab9DAb2fc6275A9": "アカウント1",
  "0x94da82206297Ce34fb00DA086FAA8b4ae4b61663": "アカウント2",
  "0xbC23F450c480E56115aA36d7970F900a772eDA21": "アカウント3",
};

// Initialize web3 provider
window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    // アカウントのプルダウンメニューを生成
    createAccountSelect();
    // 選択されたアカウントの残高を表示
    loadSelectedAccountBalance();
  } else {
    console.log('Web3 provider not found. Please install MetaMask.');
  }
});

// アカウントのプルダウンメニューを生成する関数
function createAccountSelect() {
  //const accountSelect = document.getElementById('accountSelect');
  const option = document.createElement('option');
  option.value = "";
  option.textContent = "アカウントを選択してください";
  accountSelect.prepend(option)
  // accountDataオブジェクトからアカウントと別名を取得して、プルダウンメニューに追加する
  for (const address in accountData) {
    const option = document.createElement('option');
    option.value = address;
    option.textContent = accountData[address];
    accountSelect.appendChild(option);
  }

  var selectedIndex = accountSelect.selectedIndex;
  for (var i = selectedIndex + 1; i < accountSelect.options.length; i++) {
    accountSelect.options[i].disabled = true;
  }

  // プルダウンメニューの選択が変更された際に残高を更新するイベントを追加
  accountSelect.addEventListener('change', () => {
    loadSelectedAccountBalance();
  });
}

// 選択されたアカウントの残高を表示する関数
async function loadSelectedAccountBalance() {
  //const accountSelect = document.getElementById('accountSelect');
  if(accountSelect.value == ""){
    document.getElementById('accountBalance').innerText = ""
    return
  }
  selectedAddress = accountSelect.value;
  const accountBalance = await web3.eth.getBalance(selectedAddress);
  document.getElementById('accountBalance').innerText =
    accountData[selectedAddress] + ': ' + web3.utils.fromWei(accountBalance, 'ether') + ' ETH';
  if(accountSelect.value.length != 0){
    document.getElementById("NormalRod").disabled = false;
    document.getElementById("SuperRod").disabled = false;
  }
  
}

// ETHの残高の表示
async function loadAccountBalance() {
  const accounts = await web3.eth.getAccounts();
  const accountBalance0 = await web3.eth.getBalance(account0);
  document.getElementById('account0').innerText = 'Account1: ' + web3.utils.fromWei(accountBalance0, 'ether') + ' ETH';
  const accountBalance1 = await web3.eth.getBalance(account1);
  document.getElementById('account1').innerText = 'Account2: ' + web3.utils.fromWei(accountBalance1, 'ether') + ' ETH';
  const accountBalance2 = await web3.eth.getBalance(account2);
  document.getElementById('account2').innerText = 'Account3: ' + web3.utils.fromWei(accountBalance2, 'ether') + ' ETH';
  const account = selectedAddress;
  if(selectedAddress == ""){
    document.getElementById('accountBalance').innerText = ""
  }
  else{
    accountBalance = await web3.eth.getBalance(account);
    document.getElementById('accountBalance').innerText = web3.utils.fromWei(accountBalance, 'ether') + ' ETH';
  }
  
}

//残高の更新
async function updateAccountBalance(){
  const account = selectedAddress;
  accountBalance = await web3.eth.getBalance(account);
  document.getElementById('accountBalance').innerText = web3.utils.fromWei(accountBalance, 'ether') + ' ETH';
}
// //トークン残高の表示
// function displayTokenBalance() {
//   document.getElementById('tokenBalance').innerText = 'Token Balance: ' + tokenBalance;
// }

// ロッドの購入
async function buyRod(x) {
  const rodCost = web3.utils.toWei(x.toString(), 'ether');
  Rodtype = x;
  try {
    const account = selectedAddress;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const result = await contract.methods.buyRod().send({ from: account, value: rodCost });
    const fishContract = new web3.eth.Contract(contractABI, contractAddress);
    alert('Rod purchased successfully!');
    document.getElementById("NormalRod").disabled = true;
    document.getElementById("SuperRod").disabled = true;
    document.getElementById("Fish").disabled = false;
    loadAccountBalance();
    updateAccountBalance();
    document.addEventListener('click', clickListener);
  } catch (error) {
    console.error(error);
    alert('Failed to buy rod.');
    document.getElementById("NormalRod").disabled = false;
    document.getElementById("SuperRod").disabled = false;
    document.getElementById("Fish").disabled = true;
  }
  
}

const clickListener = function(event) {
  if (Rodtype != 0) {
    var imageContainer = document.getElementById('imageContainer');
    var containerWidth = imageContainer.offsetWidth;  // 表示領域の幅を取得
    var containerHeight = imageContainer.offsetHeight;  // 表示領域の高さを取得
    var clickX = event.pageX - imageContainer.offsetLeft;  // クリックした位置のX座標（表示領域内の相対位置）
    var clickY = event.pageY - imageContainer.offsetTop;  // クリックした位置のY座標（表示領域内の相対位置）

    // クリックした位置が表示領域内であるかをチェック
    if (clickX >= 0 && clickX <= containerWidth && clickY >= 0 && clickY <= containerHeight) {
      // 古い画像を削除
      var oldImage = imageContainer.querySelector('img');
      if (oldImage) {
        oldImage.remove();
      }
      var image = document.createElement('img');
      if(Rodtype == 0.1){
        image.src = './client/img/lure.png';  // エサの画像(normal rod)
      }else{
        image.src = './client/img/ikura.png';  // エサの画像(super rod)
      }
      image.style.position = 'absolute'; // 画像の位置を指定
      image.style.width = '50px'; // 画像の幅を指定
      image.style.height = '100px'; // 画像の高さを指定
      image.style.transform = 'translate(-50%, -50%)'; // 画像を中心に配置するための変換
      image.style.left = clickX + 'px';  // クリックした位置に画像を配置する
      image.style.top = clickY + 'px';  // クリックした位置に画像を配置する
      imageContainer.appendChild(image);
    }
  }
};

// var NormalRod = document.getElementById("NormalRod");
// var SuperRod = document.getElementById("SuperRod");
// NormalRod.addEventListener('click', clickListener);
// SuperRod.addEventListener('click', clickListener);


  //lure.pngと他の画像が重なっているかを判定
  function checkOverlap(lure, otherImage) {
    const lureRect = lure.getBoundingClientRect();
    const otherRect = otherImage.getBoundingClientRect();
    
    

    return (
      lureRect.left < otherRect.right &&
      lureRect.right > otherRect.left &&
      lureRect.top < otherRect.bottom &&
      lureRect.bottom > otherRect.top
      );
  }

  function FishType() {
    // 魚の種類をランダムに決定（0から4の範囲でランダム）
    return overlappingFish.alt
  }

  //魚を釣ったときの処理
  async function GetFish() {
    try {
      const account = selectedAddress;
      const fishContract = new web3.eth.Contract(contractABI, contractAddress);
      let reward;
      if(Rodtype == 0.1){
        reward = 1;
      }else{
        reward = 2;
      }
      // アカウント4から釣った魚の種類によって報酬を計算
      const buriReward =  0.5 * reward;
      const ginyugoiReward = 0.8 * reward;
      const hatanboReward =  1.0 * reward;
      const iwanaReward =  1.2 * reward;
      const sameReward = 1.5 * reward;
      
      //魚の種類
      var FT = FishType();
      // トランザクションを送信して報酬をアカウントに送金
      switch (FT) {
        case "buri":
          console.log("ブリゲット");
          await web3.eth.sendTransaction({ from: account3, to: account, value: web3.utils.toWei(buriReward.toString(), 'ether') });
          console.log("報酬",buriReward);
          break;
        case "ginyugoi":
          console.log("ギンユゴイゲット");
          await web3.eth.sendTransaction({ from: account3, to: account, value: web3.utils.toWei(ginyugoiReward.toString(), 'ether') });
          break;
        case "hatanbo":
          console.log("ハタンボゲット");
          await web3.eth.sendTransaction({ from: account3, to: account, value: web3.utils.toWei(hatanboReward.toString(), 'ether') });
          break;
        case "iwana":
          console.log("イワナゲット");
          await web3.eth.sendTransaction({ from: account3, to: account, value: web3.utils.toWei(iwanaReward.toString(), 'ether') });
          break;
        case "same":
          console.log("サメゲット");
          await web3.eth.sendTransaction({ from: account3, to: account, value: web3.utils.toWei(sameReward.toString(), 'ether') });
          break;
        default:
          console.log('Invalid FishSize');
      }
  
      console.log('Rewards sent successfully!');
      // アカウントの残高を更新
      loadAccountBalance();
      updateAccountBalance();
      // displayTokenBalance();
    } catch (error) {
      console.error(error);
      alert('Failed to send rewards.');
    }
  }


//魚を釣ったときの処理
const result = document.getElementById("result"); 

// ヒットした後の処理
function HitFish() {
  // クイズを開始
  startQuiz();

  result.innerText = "ヒット！！";
  result.style.display = "block";
  setTimeout(hideText, 1000); // 1000ミリ秒（1秒）後にテキストを非表示にする
  // setTimeout(() => {
  //   // テキストを非表示にし、アニメーションをリセット
  //   result.style.display = "none";
  // }, 1000); // 1000ミリ秒（1秒）後にテキストを非表示にする

}

//魚がエサにかからなかったとき
function MisFish(){
  result.innerText = "ミス！！"
  result.style.display = "block";
  setTimeout(hideText, 1000); // 1000ミリ秒（1秒）後にテキストを非表示にする
}

function hideText() {
    result.style.display = "none";
  }

// Go fishing and get fish size and token reward
async function goFishing() {
  try {
    // const accounts = await web3.eth.getAccounts();
    // const account = accounts[0];

    // const contract = new web3.eth.Contract(contractABI, contractAddress);
    // const transaction = await contract.methods.goFishing().send({ from: account });
    //const events = transaction.events;
     // 指定した画像の要素を取得
     const lureImage = document.querySelector('#imageContainer img');
     const fishImages = document.querySelectorAll('#buri, #ginyugoi, #hatanbo, #iwana, #same');

      // lure.pngと他の魚の画像が重なっているかチェック
      
      fishImages.forEach((fishImage) => {
        if (checkOverlap(lureImage, fishImage)) {
          overlappingFish = fishImage;
          return;
        }
      });

      if (overlappingFish) {
        HitFish();
        // lure.pngと重なっている魚の動きを止める
        //overlappingFish.style.animationPlayState = "paused";
        const fishLeft = overlappingFish.getBoundingClientRect().left;
        const fishTop = overlappingFish.getBoundingClientRect().top;

        // 上下に震えるアニメーションを定義
        const shakeAnimation = document.styleSheets[0].insertRule(`
          @keyframes shakeAnimation {
            0% {
              transform: translate(${fishLeft}px, 0px);
            }
            25% {
              transform: translate(${fishLeft}px, -5px);
            }
            50% {
              transform: translate(${fishLeft}px, 0px);
            }
            75% {
              transform: translate(${fishLeft}px, 5px);
            }
            100% {
              transform: translate(${fishLeft}px, 0px);
            }
          }
        `, document.styleSheets[0].cssRules.length);

        // アニメーションを魚に適用し、無限に繰り返す
        overlappingFish.style.animation = `shakeAnimation 0.5s ease-in-out infinite`;
        
      } else {
        // lure.pngと他の魚の画像が重なっていない場合
        MisFish();
      }
      document.removeEventListener('click', clickListener);
  } catch (error) {
    console.error(error);
    alert('Failed to go fishing.');
  }
  // document.getElementById("NormalRod").disabled = false;
  // document.getElementById("SuperRod").disabled = false;
  document.getElementById("Fish").disabled = true;
  imageContainer.querySelector('img').remove();

}


