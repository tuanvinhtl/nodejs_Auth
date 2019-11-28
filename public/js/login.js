
function validateForm() {
    var un = document.loginform.uname.value;
    var pw = document.loginform.psw.value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                localStorage.removeItem('auth-token');
                localStorage.setItem('auth-token', xmlhttp.response);
                document.location.href = "/";
                alert("login success! token was saved: " + xmlhttp.response);
            } else if (xmlhttp.status == 400) {
                alert(xmlhttp.response);
            }
        }
    }
    var theUrl = "/api/user/login";
    xmlhttp.open("POST", theUrl, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "email": un, "password": pw }));
}