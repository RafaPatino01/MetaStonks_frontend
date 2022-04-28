function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function home(){
    const title = document.getElementById("top-title")
    const ingresar = document.getElementById("ingresar")

    let my_session = getCookie("session_metastonks")
    if(my_session != ""){
        fetch(server + '/is_logged/' + my_session)
        .then(response => response.json())
        .then(data => {
            if(data[0] == "OK"){
                console.log("logged")
                title.innerHTML = my_session + "🚀"
                ingresar.innerHTML = '<a style="cursor: pointer;" onclick="salir()" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Salir</a>'
            }
        });
    }
    else {
        title.innerHTML = "MetaStonks🚀"
        console.log("not logged")
    }
}

function link(p){
    let my_session = getCookie("session_metastonks")
    if(my_session != ""){
        fetch(server + '/is_logged/' + my_session)
        .then(response => response.json())
        .then(data => {
            if(data[0] == "OK"){
                console.log("logged")
                window.location.href = p+".html"
            }
        });
    }
    else {
        window.location.href = "login.html"
    }
}

function salir(){
    let my_session = getCookie("session_metastonks")
    fetch(server + '/log_out/' + my_session)
    .then(response => response.json())
    .then(data => {
        if(data[0] == "OK"){
            console.log("logged out...")
            document.cookie = "session_metastonks= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            location.reload();
        }
    });
    
}