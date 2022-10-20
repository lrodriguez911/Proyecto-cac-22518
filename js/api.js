const app = document.querySelector('api')
const api = document.getElementById('api')
const URL = 'https://swapi.dev/api/people/'
const valueInput = document.getElementById('valueInput')
const INPUT = document.getElementById('GET-name')

console.log(INPUT)
try {
    fetch(URL)
.then(e => e.json())
/* .then(data => valueInput.innerHTML = JSON.stringify(data)) */
.then((data) => {
     let resData = data.results.map(e => e.name)
    /* data.map(e => valueInput.innerHTML(<li>{e.name}</li>)) */
    valueInput.innerHTML = resData 
}
 )
} catch (error) {
    
}


/* algo */