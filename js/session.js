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

    let my_session = getCookie("session")
    if(my_session != ""){
        fetch(server + '/is_logged/' + my_session)
        .then(response => response.json())
        .then(data => {
            if(data[0] == "OK"){
                console.log("logged")
                title.innerHTML = my_session + "🚀"
                ingresar.innerHTML = ""
            }
        });
    }
    else {
        title.innerHTML = "MetaStonks🚀"
        console.log("not logged")
    }
}

function link(p){
    let my_session = getCookie("session")
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