const app = document.querySelector('.api')
const URL = 'https://swapi.dev/api/people/1/'


fetch(URL)
.then(e => e.json())
.then(ejason => console.log(ejason.name))
/* .then(ejason => ejason.map(e => app.innerHTML(<li>{e.name}</li>))) */