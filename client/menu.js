const regUsername = document.getElementById('regUsername'); 
const loginUsername = document.getElementById('loginUsername');
const changeUsername = document.getElementById('changeUsername');

function user(x) {
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.remove("hover"); // .visible クラスを削除
    
    let registerForm = document.getElementById("registerForm");
    let loginForm = document.getElementById("loginForm");
    let changeForm = document.getElementById("changeForm");
    
    if (x == 0) {
        createAccountSelectForPassword(0);
        registerForm.classList.toggle("visible"); // .visible クラスを追加
        loginForm.classList.remove("visible"); // .visible クラスを削除
        changeForm.classList.remove("visible"); // .visible クラスを削除
    } else if (x == 1) {
        createAccountSelectForPassword(1);
        registerForm.classList.remove("visible"); // .visible クラスを削除
        loginForm.classList.toggle("visible"); // .visible クラスを追加
        changeForm.classList.remove("visible"); // .visible クラスを削除
    } else if (x == 2) {
        createAccountSelectForPassword(2);
        registerForm.classList.remove("visible"); // .visible クラスを削除
        loginForm.classList.remove("visible"); // .visible クラスを削除
        changeForm.classList.toggle("visible"); // .visible クラスを追加
    }
}

function createAccountSelectForPassword(x) {
    // accountDataオブジェクトからアカウントと別名を取得して、プルダウンメニューに追加する
    for (const address in accountData) {
      const option = document.createElement('option');
      option.value = address;
      option.textContent = accountData[address];
      if(x==0 && regUsername.length <= 2){
        regUsername.appendChild(option);
      }else if(x==1 && loginUsername.length <= 2){
        loginUsername.appendChild(option);
      }else if(x==2 && changeUsername.length <= 2){
        changeUsername.appendChild(option);
      }
    }
  }
    

function toggleForms() {
    

    // registerForm.style.display = "none";
    // loginForm.style.display = "block";
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
    changeForm.classList.toggle("hidden");
}

