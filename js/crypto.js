fetch(server + '/token_names')
  .then(response => response.json())
  .then(data => {
    const loop = document.getElementById("loop")

    for(let i = 0; i<data.length; i++){
        loop.innerHTML += "$" + data[i] + "&#8203; &#8203; &#8203; &#8203;"
    }
});

fetch(server + '/crypto_data')
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById("tablita")
    console.log(data)
    for(let i=0; i<data.length; i++){

      let color = ""

      // Color selection
      if(data[i]["metascore"] >= 60){
        color = "good"
      }
      if(data[i]["metascore"] < 60 && data[i]["metascore"] > 30){
        color = "normal"
      }
      if(data[i]["metascore"] < 30){
        color = "bad"
      }

      let score = data[i]["metascore"]
      score /= 10;

      
      tabla.innerHTML += `
      <div class="row border-bottom pt-2 bg-dark">
        <div class="col-7">
          <h3>$${data[i]["token"]}</h3>
          <p class="m-0">Posts: ${data[i]["ocurrences"]}</p>
          <p class="m-0">Upvotes: ${data[i]["upvote_ratio"]}</p>
          <p class="m-0">Reddit score: ${data[i]["score"]}</p>
          <p class="m-0">Sentimiento: ${data[i]["title_sentiment"]}</p>
          <p class="mt-0 mb-3">Premios: ${data[i]["award"]}</p>
        </div>
        <div class="col-1 text-secondary text-end">
          MetaScore:
        </div>
        <div class="col-4 text-end">
          <h1 class="display-3 ${color}">[ ${Math.round(score * 10) / 10} ]</h1>
        </div>
      </div>
      `;
    }
});

function actualizar_metascore(){
  fetch(server + '/calcular_metascore')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
}
function actualizar_reddit(){
  fetch(server + '/update_crypto')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
}