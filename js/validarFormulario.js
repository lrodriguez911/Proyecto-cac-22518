/* para validar formulario */
const form = document.getElementById("form")
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("textArea");

form.addEventListener("submit", e =>{

let regExpCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
let regExpTelefono = /^\d{10}$/
if (nombre.value.length === 0) {
    e.preventDefault()
    alert("Ingrese un nombre valido")
}
if (apellido.value.length === 0) {
    e.preventDefault()
    alert("Ingrese un apellido valido")
}
if(!regExpCorreo.test(correo.value)){
    e.preventDefault()
    alert("Ingrese un E-mail valido")
}
if(!telefono.value.match(regExpTelefono)){
    e.preventDefault()
    alert("Ingrese un telefono valido (xxx-xxx-xxxx)")
}
if(mensaje.value.length === 0){
    e.preventDefault()
    alert("Ingrese un mensaje")
}
alert("Formulario Enviado")
})
