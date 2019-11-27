function validateForm() {
    var un = document.loginform.uname.value;
    var pw = document.loginform.psw.value;
    var username = "username";
    var password = "password";
    if ((un == username) && (pw == password)) {
        return true;
    }
    else {
        alert("Login was unsuccessful, please check your username and password");
        return false;
    }
}

function loginUser(usr, psw) {
    xhttp.open("POST", "http://localhost:3000/api/user/login", true);
    xhttp.send();
}