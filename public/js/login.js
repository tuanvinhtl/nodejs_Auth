
function validateForm() {
    var un = document.loginform.uname.value;
    var pw = document.loginform.psw.value;
    var username = "username";
    var password = "username";
    if ((un == username) && (pw == password)) {

        var xmlhttp = new XMLHttpRequest();
        var url = "/api/user/login";
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onreadystatechange = function (response) {
            console.log(xmlhttp.status);
            console.log(xmlhttp.statusText);
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myFunction(xmlhttp.responseText);
            }
        };
        xmlhttp.send(JSON.stringify({ "email": "initUser@gmail.com", "password": "initUser" }));

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