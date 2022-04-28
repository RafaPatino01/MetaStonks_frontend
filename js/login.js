async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
}

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
        hash(pass.value).then((hex) => { 
            fetch(server + '/register/' + mail.value + '/' + user.value + "/" + hex)
            // Wait 1 sec and load login
            delay(1000).then(() => window.location.href = "login.html")
        });
    }
    else {
        alert("Faltan datos")
    }
}

function login(){
    const user = document.getElementById("user")
    const pass = document.getElementById("pass")

    if(user.value != "" && pass.value != ""){
        hash(pass.value).then((hex) => { 
            fetch(server + '/login/' + user.value + '/' + hex)
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
        })
    }
    else {
        alert("Faltan datos")
    }
}