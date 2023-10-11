var db;
var request = indexedDB.open("user_db", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("users", { keyPath: "username" });
    objectStore.createIndex("hashed_password", "hashed_password", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function registerUser() {
    var regUsername = document.getElementById('regUsername').value;
    console.log(regUsername);
    var regPassword = document.getElementById('regPassword').value;
    var regConfirmPassword = document.getElementById('regConfirmPassword').value;
    var registerForm = document.getElementById("registerForm");

    if (regPassword !== regConfirmPassword) {
        alert('Passwords do not match');
        return;
    }

    var hashedPassword = await hashPassword(regPassword);
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");

    var addUserRequest = objectStore.add({ username: regUsername, hashed_password: hashedPassword });

    addUserRequest.onsuccess = function(event) {
        alert('User registered successfully');
        registerForm.classList.toggle("visible"); 
    };

    addUserRequest.onerror = function(event) {
        alert('Error registering user');
    };

    

}

async function loginUser() {
    //var loginUsername = document.getElementById('loginUsername').value;
    var loginPassword = document.getElementById('loginPassword').value;

    var hashedLoginPassword = await hashPassword(loginPassword);

    var transaction = db.transaction(["users"], "readonly");
    var objectStore = transaction.objectStore("users");

    var getUserRequest = objectStore.get(loginUsername.value);

    getUserRequest.onsuccess = function(event) {
        var user = event.target.result;
        if (user && user.hashed_password === hashedLoginPassword) {
            alert('Login successful');
            loginForm.classList.toggle("visible"); 
            accountSelect[(loginUsername.selectedIndex)+1].disabled = false; //ロック解除
        } else {
            alert('Incorrect username or password');
        }
    };

    getUserRequest.onerror = function(event) {
        alert('User not found');
    };
}

async function verifyPassword(username, inputPassword) {
    var transaction = db.transaction(["users"], "readonly");
    var objectStore = transaction.objectStore("users");
    var getUserRequest = objectStore.get(username);
    inputPassword = await hashPassword(inputPassword);
    console.log(inputPassword);
    return new Promise(function(resolve, reject) {
        getUserRequest.onsuccess = function(event) {
            var user = event.target.result;
            if (user) {
                resolve(user.hashed_password === inputPassword);
                console.log("現在のパスワード",user.hashed_password)
                console.log("入力パスワード",inputPassword)
                console.log(user.hashed_password == inputPassword);
            } else {
                resolve(false);
            }
        };

        getUserRequest.onerror = function(event) {
            reject(new Error('Error fetching user data'));
        };
    });
}

async function changePassword() {
    var changeUsername = document.getElementById('changeUsername').value;
    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('newPassword').value;

    var isPasswordValid = await verifyPassword(changeUsername, currentPassword);
    console.log(isPasswordValid);
    if (isPasswordValid) {
        var hashedNewPassword = await hashPassword(newPassword);
        var transaction = db.transaction(["users"], "readwrite");
        var objectStore = transaction.objectStore("users");
        var updateUserRequest = objectStore.put({ username: changeUsername, hashed_password: hashedNewPassword });

        updateUserRequest.onsuccess = function(event) {
            alert('Password changed successfully');
            changeForm.classList.toggle("visible");
        };

        updateUserRequest.onerror = function(event) {
            alert('Error changing password');
        };
    } else {
        alert('Incorrect current password');
    }
}
