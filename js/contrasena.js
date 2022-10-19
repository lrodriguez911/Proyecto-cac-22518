import {validarCampoRequerido, validarContrasena } from "./validaciones.js";

let codigo = document.getElementById('codigo');
let claveI = document.getElementById('claveI');
let claveC = document.getElementById('claveC');
let formulario = document.getElementById('formClave');

claveI.addEventListener('blur', () => { validarCampoRequerido(claveI) });
claveC.addEventListener('blur', () => { validarCampoRequerido(claveC) });
formulario.addEventListener('submit', editarUsuario);
let listaAdmins = null;
let listaInvitados = null;
let listaUsuario = null;
let idx = [];
let usuarioE = [];

const cargaInicial = () => {
    listaInvitados = JSON.parse(localStorage.getItem('listaInvitadosT')) || [];
    listaAdmins = JSON.parse(localStorage.getItem('listaAdminsT')) || [];
    listaUsuario = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaUsuario.length > 0) {
        cargarUsuario(listaUsuario[0]);
    }
}

function editarUsuario(e) {
    e.preventDefault();
    if (validarContrasena()) {
        actualizarContrasena();
    }
}

function cargarUsuario(usuarioE) {
    codigo.value = `${usuarioE.codigo}`;
}

function actualizarContrasena() {
    let ideUsuario = listaUsuario[0].confirmar;
    if (ideUsuario == undefined) {
        usuarioE = listaInvitados.find((invitado) => { return invitado.codigo == codigo.value });
        console.log(usuarioE)
        idx = listaInvitados.indexOf(usuarioE);
        if (claveI.value == claveC.value) {
            usuarioE.contrasena = claveI.value;
            listaInvitados[idx] = usuarioE;
            localStorage.setItem('listaInvitadosT', JSON.stringify(listaInvitados));
            borrarUsuario();
            limpiarFormulario();
            Swal.fire(
                'Buen trabajo',
                'Se actualizó la contraseña',
                'success'
            ).then(function() {
                location.href = "/pages/login.html";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no son iguales',
                footer: '<a href="">¿Por que sucedio esto?</a>'
            })
        }
    } else {
        usuarioE = listaAdmins.find((admin) => { return admin.codigo == codigo.value });
        idx = listaAdmins.indexOf(usuarioE);
        if (claveI.value == claveC.value) {
            usuarioE.contrasena = claveI.value;
            listaAdmins[idx] = usuarioE;
            localStorage.setItem('listaAdminsT', JSON.stringify(listaAdmins));
            borrarUsuario();
            limpiarFormulario();
            Swal.fire(
                'Buen trabajo',
                'Se actualizó la contraseña',
                'success'
            ).then(function() {
                location.href = "/pages/login.html";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no son iguales',
                footer: '<a href="">¿Por que sucedio esto?</a>'
            })
        }
    }
}

function borrarUsuario(){
    listaUsuario.splice(0, 1);
    localStorage.setItem('listaLoginU', JSON.stringify(listaUsuario));
}

function limpiarFormulario() {
    formulario.reset();
    codigo.disabled = true;
    codigo.className = 'form-control';
    claveI.className = 'form-control';
    claveC.className = 'form-control';
}

cargaInicial();