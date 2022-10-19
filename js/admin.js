import { validarCodigo, validarCampoRequerido, validarNumeros, validarGeneralP } from "./validaciones.js";
import { LibroN } from "./libro_class.js";

//traer los campos a validar
let codigo = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let autor = document.getElementById('autor');
let categoria = document.getElementById('categoria');
let paginas = document.getElementById('paginas');
let precio = document.getElementById('precio');
let direccion = document.getElementById('direccion');
let formulario = document.getElementById('formLibros');
let limpiar = document.getElementById('limpiar');
let alerta = document.getElementById('msjAlerta');
let saludo = document.getElementById('iniSes');
let panel1 = document.getElementById('panel1');
let panel2 = document.getElementById('panel2');
let panel3 = document.getElementById('panel3');
let panel4 = document.getElementById('panel4');
let iniciar = document.getElementById('iniciarS');
let cerrar = document.getElementById('cerrarS');
let textoUsuario = document.getElementById('ideU');
let textoAdmin = document.getElementById('ideA');
let libroEncontrado = null;
let listaLogin = null;
let editar = false;
let listaLibros = [];

// funciones cuando sucede un evento en el html
codigo.addEventListener('blur', () => {validarCodigo(codigo)});
nombre.addEventListener('blur', () => {validarCampoRequerido(nombre)});
autor.addEventListener('blur', () => {validarCampoRequerido(autor)});
paginas.addEventListener('blur', () => {validarNumeros(paginas)});
precio.addEventListener('blur', () => {validarCampoRequerido(precio)});
direccion.addEventListener('blur', () => { validarCampoRequerido(direccion) });
limpiar.addEventListener('click', () => { limpiarForm() });
iniciar.addEventListener('click', () => { iniciarSesion() });
cerrar.addEventListener('click', () => { cerrarSesion() });
formulario.addEventListener('submit', guardarLibro);

const crearFila = (libro) => {
    let tabla = document.getElementById("tablaLibro");
    tabla.innerHTML += `              
    <tr>
    <th scope="row">${libro.codigo}</th>
    <td>${libro.nombre}</td>
    <td>${libro.autor}</td>
    <td>${libro.categoria}</td>
    <td>${libro.paginas}</td>
    <td>${libro.precio}</td>
    <td>${libro.direccion}</td>
    <td>
      <button type="button" class="btn btn-warning my-1" onclick="editarLibro(${libro.codigo});">Editar</button>
      <button type="button" class="btn btn-danger my-1" onclick="borrarLibro(${libro.codigo});">Borrar</button>
    </td>
  </tr>`;
}

window.borrarLibro = (codigoE) => {
    let idx = listaLibros.indexOf(listaLibros.find((libro) => {return libro.codigo == codigoE}));
    Swal.fire({
        title: '¿Estás seguro de eliminar el libro?',
        text: "No se podrá recuperar los datos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            listaLibros.splice(idx, 1);
            localStorage.setItem('listaLibrosT', JSON.stringify(listaLibros));
            location.reload();
        }
    })
}

window.editarLibro = (codigoE) => {
    editar = true;
    libroEncontrado = listaLibros.find((libro) => { return libro.codigo == codigoE });
    if (libroEncontrado != undefined) {
        codigo.disabled = true;
        codigo.value = `${libroEncontrado.codigo}`;
        nombre.value = `${libroEncontrado.nombre}`;
        autor.value = `${libroEncontrado.autor}`;
        categoria.value = `${libroEncontrado.categoria}`;
        paginas.value = `${libroEncontrado.paginas}`;
        precio.value = `${libroEncontrado.precio}`;
        direccion.value = `${libroEncontrado.direccion}`;
    }
}

function iniciarSesion(){
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
            }
            location.href = "../index.html";
        }
    })
}else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has iniciado sesion',
        footer: '<a href="">¿Por que sucedio esto?</a>'
    }).then(function () {
        location.href = "/pages/login.html";
    });
}
}

function limpiarForm() {
    editar = false;
    alerta.className = "alert alert-danger mt-4 d-none";
    alerta.innerHTML = "";
    limpiarFormulario();
}

const cargaInicial = () => {
    listaLibros = JSON.parse(localStorage.getItem('listaLibrosT')) || [];
    if (listaLibros.length > 0) {
        listaLibros.forEach((libro) => {
            crearFila(libro);
        });
    }
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        iniSesion(listaLogin[0]);
    }
}

function guardarLibro(e) {
    e.preventDefault();
    if (validarGeneralP()) {
        ingresarLibro();
    }
}

function ingresarLibro() {
    if (editar) {
        let idx = listaLibros.indexOf(libroEncontrado);
        libroEncontrado.codigo = codigo.value;
        libroEncontrado.nombre = nombre.value;
        libroEncontrado.autor = autor.value;
        libroEncontrado.categoria = categoria.value;
        libroEncontrado.paginas = paginas.value;
        libroEncontrado.precio = precio.value;
        libroEncontrado.direccion = direccion.value;
        // asignar al array la modificación
        listaLibros[idx] = libroEncontrado;
        Swal.fire(
            'Buen trabajo',
            'Se editó el libro correctamente',
            'success'
        ).then(function() {
            location.reload();
        });
    }else {
        let libroBuscado = listaLibros.find((libro) => {return libro.codigo == codigo.value });
        if (libroBuscado == undefined) {
            let nuevoLibro = new LibroN();
            nuevoLibro.nuevoCodigo = codigo.value;
            nuevoLibro.nuevoNombre = nombre.value;
            nuevoLibro.nuevoAutor = autor.value;
            nuevoLibro.nuevaCategoria = categoria.value;
            nuevoLibro.nuevasPaginas = paginas.value;
            nuevoLibro.nuevoPrecio = precio.value;
            nuevoLibro.nuevaDireccion = direccion.value;
            // agregar a la lista de productos
            listaLibros.push(nuevoLibro);
            Swal.fire(
                'Buen trabajo',
                'Se agregó el producto correctamente',
                'success'  
            ).then(function() {
                location.reload();
            });
        }else {
            alerta.className = "alert alert-danger mt-4";
            alerta.innerHTML = "No se puede ingresar. El código ya existe !!";
        }
    }
    // guardar en localstorage previo a la base de datos
    localStorage.setItem('listaLibrosT', JSON.stringify(listaLibros));
    limpiarFormulario();
}

function limpiarFormulario() {
    formulario.reset();
    codigo.disabled = false;
    codigo.className = 'form-control';
    nombre.className = 'form-control';
    autor.className = 'form-control';
    paginas.className = 'form-control';
    precio.className = 'form-control';
    direccion.className = 'form-control';
}

function iniSesion(usuarioC) {
    let ideUsuario = usuarioC.confirmar;
    saludo.innerHTML = `Hola, ${usuarioC.codigo}`;
    panel2.className = "text-center container borderF my-5 d-none";
    if (ideUsuario  == undefined) {
        panel3.className = "text-center container borderF my-5";
        textoUsuario.innerHTML = `${usuarioC.codigo}`;
    } else {
        panel4.className = "text-center container borderF my-5";
        textoAdmin.innerHTML = `${usuarioC.codigo}`;
        panel1.className = "";
    }
}

function finSesion() {
    saludo.innerHTML = `Iniciar sesión...`;
    panel1.className = "d-none";
    panel2.className = "text-center container borderF my-5";
    panel3.className = "text-center container borderF my-5 d-none";
    panel4.className = "text-center container borderF my-5 d-none";
}

cargaInicial();