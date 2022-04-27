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

function register(){
    const user = document.getElementById("user")
    const pass = document.getElementById("pass")
    const mail = document.getElementById("email")

    if(user.value != "" && pass.value != "" && mail.value != ""){
        hash(pass.value).then((hex) => { 
            fetch(server + '/register/' + mail.value + '/' + user.value + "/" + hex)
        });
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
        hash(pass.value).then((hex) => { 
            fetch(server + '/login/' + user.value + '/' + hex)
             .then(response => response.json())
             .then(data => console.log(data));
        });

        //delay(1000).then(() => window.location.href = "login.html")
    }
    else {
        alert("Faltan datos")
    }
}