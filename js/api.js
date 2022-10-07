const app = document.querySelector('.api')
const URL = 'https://swapi.dev/api/'
const valueInput = document.getElementById('valueInput')
const INPUT = document.getElementById('GET-name')

console.log(INPUT)
fetch(URL)
.then(e => e.json())
.then(ejason => valueInput.innerHTML = JSON.stringify(ejason))
/* .then(ejason => ejason.map(e => app.innerHTML(<li>{e.name}</li>))) */
/* agregar algo */
/* algo */