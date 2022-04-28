fetch(server + '/token_names')
  .then(response => response.json())
  .then(data => {
    const loop = document.getElementById("loop")

    for(let i = 0; i<data.length; i++){
        loop.innerHTML += "$" + data[i] + "&#8203; &#8203; &#8203; &#8203;"
    }

    
  });