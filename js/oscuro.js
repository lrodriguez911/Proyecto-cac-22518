const storage = window.localStorage

const check = document.querySelector('.botonespacio')
const body = document.querySelector('.body')
const card = document.querySelectorAll("div[class = 'card-body']")
const bgl = document.querySelector('.bg-light')

let oscuro = Boolean(storage.getItem('oscuro'))

const comprobarOscuro = oscuro => {
  if (oscuro) {
    body.classList.add('cambio-color')
    for (const i of card) {
      i.classList.add('cambio-color-card')
    }
    check.checked = true
  }else{
    body.classList.remove('cambio-color')
    for (const i of card) {
      i.classList.remove('cambio-color-card')
    }
    check.checked = false
  }
}
 const comprobarClaro = bgl => {
  if (bgl !== null && check.checked !== true) {
  bgl.classList.remove('cambio-color-card'),
  bgl.classList.add('bg-light')}  
  if (check.checked === true) {
    bgl.classList.add('cambio-color-card')
  bgl.classList.remove('bg-light')
  }
}
comprobarOscuro(oscuro)
comprobarClaro(bgl)
check.addEventListener('click', function(){
  if (this.checked) {
    body.classList.add('cambio-color')
    for (const i of card) {
      i.classList.add('cambio-color-card')
    }
    bgl.classList.remove('bg-light')
    storage.setItem('oscuro', true)
  }
  else{
    body.classList.remove('cambio-color')
    for (const i of card) {
      i.classList.remove('cambio-color-card')
    }
    bgl.classList.add('bg-light')
    bgl.classList.remove('cambio-color-card')
    storage.removeItem('oscuro')
  }
}
)