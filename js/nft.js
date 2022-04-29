function search(){
    const address = document.getElementById("address")
    const div = document.getElementById("my_div")

    if(address.value != ""){
        fetch(server + '/rarity/' + address.value)
        .then(response => response.json())
        .then(data => {
            div.innerHTML = `
            <img class="w-50" src="${data[1]}" alt="">
            <p class="lead mb-0 mt-3">${address.value}</p>
            <p>rarity: ${data[0]}</p>`;
        });
    }
    
    
}