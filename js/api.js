/* Informacion de API de personajes mas relevantes URL */
const URL = 'https://swapi.dev/api/people/'

/* Selectores de los elementos de la pagina */
const api = document.getElementById('api')
const contenedorCard = document.getElementById('contenedor-card')
const cards = document.querySelectorAll('.card')


console.log(cards)

const recibeInfo = async () => {
    try {
fetch(URL, {cache: 'no-cache'})
.then(e => e.json())
.then((data) => {   
    console.log(data.results)
     const tpl = data.results.map(e => {
      return `<div class="card">
      <img
        src="/images/Personajes/${e.name.replace(' ', '').replace('-', '')}.png"
        alt="star wars battlefront"
      />
      <h4>${JSON.stringify(e.name)}</h4>
      <h5>Altura:${JSON.stringify(e.height)}cm</h5>
      <h5>Peso:${JSON.stringify(e.mass)}kg</h5>
    </div>`  }
  ).join('')
    contenedorCard.innerHTML =  tpl
}
)
} catch (error) {
    console.log(error)
}
}
window.addEventListener('load', () => recibeInfo())
/* buttonLuke.addEventListener('click', function(){recibeInfo(this.value)}) */
/* algo */

/* */