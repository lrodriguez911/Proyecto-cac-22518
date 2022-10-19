import { validarCampoRequerido, validarLogin } from "./validaciones.js";

let idUsuario = document.getElementById('usuario');
let contrasena = document.getElementById('password');
let tipoUsuario = document.getElementsByName('usuarios');
let formulario = document.getElementById('formPersonas');
let saludo = document.getElementById('iniSes');
let panel1 = document.getElementById('panel1');
let panel2 = document.getElementById('panel2');
let panelTexto = document.getElementById('nombreU');
let iniciar = document.getElementById('iniciarS');
let cerrar = document.getElementById('cerrarS');

// funciones cuando sucede un evento en el html
idUsuario.addEventListener('blur', () => { validarCampoRequerido(idUsuario) });
contrasena.addEventListener('blur', () => { validarCampoRequerido(contrasena) });
iniciar.addEventListener('click', () => { iniciarSesion() });
cerrar.addEventListener('click', () => { cerrarSesion() });
formulario.addEventListener('submit', loginUsuario);
let usuario = 1;
let listaInvitados = null;
let listaAdmins = null;
let listaLogin = [];

function definirUsuario(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            return input[i].value;
        }
    }
}

const cargaInicial = () => {
    listaInvitados = JSON.parse(localStorage.getItem('listaInvitadosT')) || [];
    console.log(listaInvitados)
    listaAdmins = JSON.parse(localStorage.getItem('listaAdminsT')) || [];
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        iniSesion(listaLogin[0]);
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
                listaLogin.splice(0, 1);
                localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
                finSesion();
                location.href = "../index.html";
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
}

function loginUsuario(e) {
    e.preventDefault();
    if (validarLogin()) {
        usuario = definirUsuario(tipoUsuario);
        if (usuario == 1) {
            loginInvitado();
        } else {
            loginAdmin();
        }
    }
}

function loginInvitado() {
    let invitadoE = listaInvitados.find((invitado) => { return invitado.codigo == idUsuario.value });
    if (invitadoE != undefined) {
        if (invitadoE.contrasena == contrasena.value) {
            listaLogin.push(invitadoE);
            localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
            iniSesion(invitadoE);
        } else {
            listaLogin.push(invitadoE);
            localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña es incorrecta',
                footer: '<a href="">¿Por que sucedio esto?</a>'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no existe',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        })
    }
    limpiarFormulario();
}

function loginAdmin() {
    let adminE = listaAdmins.find((admin) => { return admin.codigo == idUsuario.value });
    if (adminE != undefined) {
        if (adminE.contrasena == contrasena.value) {
            listaLogin.push(adminE);
            localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
            iniSesion(adminE);
        } else {
            listaLogin.push(adminE);
            localStorage.setItem('listaLoginU', JSON.stringify(listaLogin));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña es incorrecta',
                footer: '<a href="">¿Por que sucedio esto?</a>'
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no existe',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        })
    }
    limpiarFormulario();
}

function iniSesion(usuarioC) {
    let ideUsuario = usuarioC.confirmar;
    saludo.innerHTML = `Hola, ${usuarioC.codigo}`;
    panel1.className = "contenedor2 text-center my-5 d-none";
    panel2.className = "text-center container borderF my-5";
    if (ideUsuario == undefined) {
        panelTexto.innerHTML = `Invitado: ${usuarioC.codigo}`;

    } else {
        panelTexto.innerHTML = `Admin: ${usuarioC.codigo}`;
    }
}

function finSesion() {
    saludo.innerHTML = `Iniciar sesión...`;
    panel1.className = "contenedor2 text-center my-5";
    panel2.className = "text-center container borderF my-5 d-none";
}

function limpiarFormulario() {
    tipoUsuario[0].checked = true;
    formulario.reset();
    idUsuario.className = 'form-control';
    contrasena.className = 'form-control';
}

cargaInicial();