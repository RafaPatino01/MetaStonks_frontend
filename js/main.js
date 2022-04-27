let mode = 0 // Mode 0 es desarrollo local
let server = ""

if(mode == 0){
  server = "http://localhost:3000"
}
else {
  server = "http://146.190.1.241"
}

fetch(server + '/token_names')
  .then(response => response.json())
  .then(data => console.log(data));
