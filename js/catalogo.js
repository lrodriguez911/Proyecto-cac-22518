import { validarCampoRequerido, validarComent} from "./validaciones.js";
import { ComentarioN } from "./coment_class.js";

let saludo = document.getElementById('iniSes');
let iniciar = document.getElementById('iniciarS');
let cerrar = document.getElementById('cerrarS');
let panel1 = document.getElementById('panel1');
let panel2 = document.getElementById('panel2');
let mensaje = document.getElementById('mensaje');
let comentar = document.getElementById('comentB');
let cancelar = document.getElementById('cancelB');
let formulario = document.getElementById('formC');
let fila = document.querySelector("#coments");

mensaje.addEventListener('blur', () => { validarCampoRequerido(mensaje) });
iniciar.addEventListener('click', () => { iniciarSesion() });
cerrar.addEventListener('click', () => { cerrarSesion() });
comentar.addEventListener('click', () => { ingresarComent() });
cancelar.addEventListener('click', () => { cerrarComent() });

let listaComentarios = null;
let listaLogin = null;
let codigoLibro = null;
let nombreLibro = null;
let listaLibros = [];
let totalCompra = 0;

const cargaInicial = () => {
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        iniSesion(listaLogin[0]);
    }
    listaLibros = JSON.parse(localStorage.getItem("listaLibrosT")) || [];
    if (listaLibros.length > 0) {
        listaLibros.forEach(itemLibro => {
            crearColumna(itemLibro);
        });
    }
}

const cargarComentarios = (codigo) => {
    listaComentarios = JSON.parse(localStorage.getItem('listaComentariosT')) || [];
    if (listaComentarios.length > 0) {
        let libroComentarios = listaComentarios.filter((coment) => {return coment.codigo == codigo});
        console.log(libroComentarios)
        if (libroComentarios.length > 0) {
            fila.innerHTML = `
            <div class="card">
                <div class="card-header text-center">
                    <h3> ${libroComentarios[0].nombre} </h3>
                </div>
            </div>`;
            libroComentarios.forEach(itemComent => {
                crearFila(itemComent);
            }); 
        }
    }
}

function iniciarSesion() {
    location.href = "/pages/login.html";

}

const inicioOK = () => {
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        return true;
    } else {
        return false;
    }
}

function cerrarSesion() {
    if (inicioOK()) {
        Swal.fire({
            title: '¿Estás seguro de cerrar sesión?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                if (listaLogin.length > 0) {
                    listaLogin.splice(0, 1);
                    localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
                    finSesion();
                    location.href = "../index.html";
                }
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has iniciado sesion',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        }).then(function () {
            location.href = "/pages/login.html";
        });
    }
    cargaInicial();
}

function iniSesion(usuarioC) {
    saludo.innerHTML = `Hola, ${usuarioC.codigo}`;
}

function finSesion() {
    saludo.innerHTML = `Iniciar sesión...`;
}

function crearFila(comentario){
    fila.innerHTML += `
    <div class="card">
        <div class="card-body">
            <h6 class="card-title">${comentario.usuario}</h6>
            <div class="borderC">
            <p class="card-text mx-3 my-2">${comentario.mensaje}</p>
            </div>
        </div>
    </div>`;
}

function crearColumna(libro) {
    let grilla = document.querySelector("#grilla");
    grilla.innerHTML += `
    <div class="col-sm-12 col-md-4 col-lg-3 mb-3 ">
        <div class="card">
            <img src="${libro.direccion}" class="card-img-top" alt="${libro.nombre}" width="200" height="300">
            <div class="card-header">
                ${libro.codigo}
            </div>
            <div class="card-body">
                <h5 class="card-title">${libro.nombre}</h5>
                <p class="card-text">Autor: ${libro.autor}</p>
                <p class="card-text">Categoría: ${libro.categoria}</p>
                <p class="card-text">Precio: $${libro.precio}</p>
                <button type="button" class="btn btn-primary text-center my-1" onclick="agregarCarrito('${libro.nombre}','${libro.precio}')" id="comprar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Comprar
                </button>
                <button type="button" class="btn btn-secondary text-center my-1" onclick="agregarComentario('${libro.codigo}', '${libro.nombre}')" id="comentar">
                Comentar
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">Carrito de compras</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Seguir comprando"></button>
                    </div>
                    <div class="modal-body">
                    <div class="card text-center">
                      <div id="tarjetaCarrito">
                      </div>
              
                      <div id="totalCarrito">
                      </div>
                   </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Seguir comprando</button>
                      <a href="/pages/error.html" class="btn btn-danger" role="button" role="button">Finalizar compra</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>`;
}

window.agregarCarrito = (nombre, precio) => {
    if (inicioOK()) {
        let carrito = document.querySelector("#tarjetaCarrito");
        let total = document.querySelector("#totalCarrito")
        carrito.innerHTML += `
              <h5 class="card-title mt-1">${nombre}</h5>
              <p class="card-text" >${precio}</p>
              <hr>`;

        totalCompra += parseFloat(precio);
        total.innerHTML = ` <h5 class="card-title mt-1">Total= $${totalCompra}</h5>`;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para comprar debes iniciar sesión',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        }).then(function () {
            location.href = "/pages/login.html";
        });
    }
}

window.agregarComentario = (codigo, nombre) => {
    fila.innerHTML = ``;
    codigoLibro = codigo;
    nombreLibro = nombre;
    if (inicioOK()) {
        panel1.className = "container my-5 d-none";
        panel2.className = "container my-5";
        cargarComentarios(codigo);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Para comentar debes iniciar sesión',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        }).then(function () {
            location.href = "/pages/login.html";
        });
    }
}

function ingresarComent(){
    if(validarComent()){
        let nuevoComentario = new ComentarioN();
        nuevoComentario.usuario = listaLogin[0].codigo;
        nuevoComentario.mensaje = mensaje.value;
        nuevoComentario.codigo = codigoLibro;
        nuevoComentario.nombre = nombreLibro;
        listaComentarios.push(nuevoComentario);
        // guardar en localstorage
        localStorage.setItem('listaComentariosT', JSON.stringify(listaComentarios));
        limpiarFormulario();   
        cargarComentarios(nuevoComentario.codigo);
    }
}

function cerrarComent(){
    panel1.className = "container my-5";
    panel2.className = "container my-5 d-none";
}

function limpiarFormulario() {
    formulario.reset();
    mensaje.className = 'form-control';
}

cargaInicial();