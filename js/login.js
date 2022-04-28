function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function register(){
    const user = document.getElementById("user")
    const pass = document.getElementById("pass")
    const mail = document.getElementById("email")

    if(user.value != "" && pass.value != "" && mail.value != ""){
        fetch(server + '/register/' + mail.value + '/' + user.value + "/" + sha256(pass.value))
        // Wait 1 sec and load login
        delay(1000).then(() => window.location.href = "login.html")
    }
    else {
        alert("Faltan datos")
    }
}

function login(){
    const user = document.getElementById("user")
    const pass = document.getElementById("pass")

    if(user.value != "" && pass.value != ""){
        fetch(server + '/login/' + user.value + '/' + sha256(pass.value))
            .then(response => response.json())
            .then(data => {
            if(data[0] == "OK"){
                console.log("Login Correcto")
                setCookie("session_metastonks",user.value,1)
                delay(500).then(() => window.location.href = "index.html")
            }
            else {
                alert("Login Incorrecto")
            }
            
        }); 
    }
    else {
        alert("Faltan datos")
    }
}