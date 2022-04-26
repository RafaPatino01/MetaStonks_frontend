fetch('http://146.190.1.241/token_names')
  .then(response => response.json())
  .then(data => console.log(data));
