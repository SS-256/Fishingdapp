const accountSelect = document.getElementById('accountSelect');
const accountSelectpassword = document.getElementById('accountSelectForPassword');
const accountData = {
    "0x5C5fC0C71B3dbA48dB11cE94fab9DAb2fc6275A9": "アカウント1",
    "0x94da82206297Ce34fb00DA086FAA8b4ae4b61663": "アカウント2",
    "0xbC23F450c480E56115aA36d7970F900a772eDA21": "アカウント3",
  };
let passwordMap = {}; // パスワードを保存するオブジェクト

// アカウント選択のプルダウンメニューを生成する関数
function createAccountSelectForPassword() {
  const accountSelectpassword = document.getElementById('accountSelectForPassword');

  // accountDataオブジェクトからアカウントと別名を取得して、プルダウンメニューに追加する
  for (const address in accountData) {
    const option = document.createElement('option');
    option.value = address;
    option.textContent = accountData[address];
    accountSelectpassword.appendChild(option);
  }
}

// パスワードを設定する関数
function setPassword() {
  const selectedAddress = accountSelect.value;
  const passwordInput = document.getElementById('password').value;

  if (selectedAddress && passwordInput) {
    passwordMap[selectedAddress] = passwordInput; // パスワードを保存

    alert('パスワードが設定されました。');
  } else {
    alert('アカウントとパスワードを入力してください。');
  }
}
// パスワード確認
function confirmPassword() {
  const accountSelectpassword = document.getElementById('accountSelectForPassword');
  const selectedAddress = accountSelectpassword.value;
  const passwordInput = document.getElementById('passwordConfirm').value;

  if (selectedAddress && passwordMap[selectedAddress] === passwordInput) {
    document.getElementById('passwordConfirmResult').textContent = 'Password confirmed.';
    accountSelect.disabled = true;
    console.log(accountSelect[selectedAddress])
  } else {
    document.getElementById('passwordConfirmResult').textContent = 'Password does not match.';
  }
}

// ページロード時にアカウント選択のプルダウンメニューを生成
window.addEventListener('load', () => {
  createAccountSelectForPassword();
});