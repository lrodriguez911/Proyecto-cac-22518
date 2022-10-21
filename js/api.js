/* Informacion de API de personajes mas relevantes URL */
const URL = 'https://swapi.dev/api/people/'

/* Selectores de los elementos de la pagina */
const api = document.getElementById('api')
const buttonLuke = document.getElementById('buttonLuke')
const valueInput = document.getElementById('valueInput')


console.log(buttonLuke.value)
const recibeInfo = async (filtro) => {
    try {
     fetch(URL, {cache: 'no-cache'})
.then(e => e.json())
.then((data) => {   
        console.log(filtro)
     const dataFilter = data.results.filter(e => e.name === filtro)
     api.innerHTML = `<div class="card">
     <img
       src="/images/Personajes/${filtro.replace(' ', '-')}.jpg"
       alt="star wars battlefront"
     />
     <h4>${JSON.stringify(dataFilter)}</h4>
    
   </div>`
   
}
 )
} catch (error) {
    console.log(error)
}
}

buttonLuke.addEventListener('click', function(){recibeInfo(this.value)})
/* algo */