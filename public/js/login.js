
function validateForm() {
    var un = document.loginform.uname.value;
    var pw = document.loginform.psw.value;
    var username = "username";
    var password = "username";
    if ((un == username) && (pw == password)) {

        var xmlhttp = new XMLHttpRequest();
        var theUrl = "/api/user/login";
        xmlhttp.open("POST", theUrl, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ "email": "initUser@gmail.com", "password": "initUser" }));

        // return true;
    }
    else {
        alert("Login was unsuccessful, please check your username and password");
        return false;
    }
}