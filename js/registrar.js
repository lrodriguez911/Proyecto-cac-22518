import { validarCampoRequerido, validarCodigo, validarCorreo, validarAnio, validarInvitado, validarAdmin } from "./validaciones.js";
import { UsuarioN, AdminS } from "./usuarios_class.js";

//traer los campos a validar
let codigo = document.getElementById('codigo');
let correo = document.getElementById('correo');
let anio = document.getElementById('anio');
let tipoUsuario = document.getElementsByName('usuarioR');
let claveS = document.getElementById('confirmacion');
let claveI = document.getElementById('claveI');
let claveC = document.getElementById('claveC');
let limpiar = document.getElementById('limpiar');
let alerta = document.getElementById('msjAlerta');
let formulario = document.getElementById('formPersonas');

// funciones cuando sucede un evento en el html
claveS.disabled = true;
codigo.addEventListener('blur', () => { validarCodigo(codigo) });
correo.addEventListener('blur', () => { validarCorreo(correo) });
anio.addEventListener('blur', () => { validarAnio(anio) });
claveI.addEventListener('blur', () => { validarCampoRequerido(claveI) });
claveC.addEventListener('blur', () => { validarCampoRequerido(claveC) });
limpiar.addEventListener('click', () => { limpiarForm() });
formulario.addEventListener('submit', guardarUsuario);
tipoUsuario[0].addEventListener('change', function (event) {
    claveS.disabled = true;
    if (this.value == 0) {
        claveS.disabled = false;
    }
});
tipoUsuario[1].addEventListener('change', function (event) {
    claveS.disabled = false;
    if (this.value == 1) {
        claveS.disabled = true;
    }
});

let listaInvitados = [];
let listaAdmins = [];

function limpiarForm() {
    alerta.className = "alert alert-danger mt-4 d-none";
    alerta.innerHTML = "";
    limpiarFormulario();
}

const cargaInicial = () => {
    listaInvitados = JSON.parse(localStorage.getItem('listaInvitadosT')) || [];
    listaAdmins = JSON.parse(localStorage.getItem('listaAdminsT')) || [];
}

function definirUsuario(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            return input[i].value;
        }
    }
}

function guardarUsuario(e) {
    e.preventDefault();
    let usuario = definirUsuario(tipoUsuario);
    if (usuario == 1) {
        if (validarInvitado()) {
            ingresarInvitado();
        }
    } else {
        claveS.disabled = false;
        if (validarAdmin()) {
            ingresarAdmin();
        }
    }
}

function ingresarInvitado() {
    let invitadoE = listaInvitados.find((invitado) => { return invitado.codigo == codigo.value });
    if (invitadoE == undefined && claveI.value == claveC.value) {
        let nuevoInvitado = new UsuarioN();
        nuevoInvitado.nuevoAnio = anio.value;
        let mayor = nuevoInvitado.esMayor();
        if (mayor) {
            nuevoInvitado.nuevoCodigo = codigo.value;
            nuevoInvitado.nuevoCorreo = correo.value;
            nuevoInvitado.nuevaContrasena = claveI.value;
            // agregar a la lista de productos
            listaInvitados.push(nuevoInvitado);
            Swal.fire(
                'Buen trabajo',
                'Se agregó un nuevo usuario',
                'success'
            ).then(function() {
                location.href = "/pages/login.html";
            });
            // guardar en localstorage previo a la base de datos
            localStorage.setItem('listaInvitadosT', JSON.stringify(listaInvitados));
            limpiarFormulario();
        } else {
            alerta.className = "alert alert-danger mt-4";
            alerta.innerHTML = "No se puede ingresar. La persona no es mayor de edad !!";
        }
    } else {
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = "Error ==> Las contraseñas no son iguales o ya existe el Id !!";
    }

}

function ingresarAdmin() {
    let adminE = listaAdmins.find((admin) => { return admin.codigo == codigo.value });
    if (adminE == undefined && claveI.value == claveC.value) {
        let nuevoAdmin = new AdminS();
        nuevoAdmin.nuevoAnio = anio.value;
        let mayor = nuevoAdmin.esMayor();
        if (mayor) {
            let confirma = nuevoAdmin.confirmarAdmin(claveS.value);
            if (confirma) {
                nuevoAdmin.nuevoCodigo = codigo.value;
                nuevoAdmin.nuevoCorreo = correo.value;
                nuevoAdmin.nuevaContrasena = claveI.value;
                // agregar a la lista de productos
                listaAdmins.push(nuevoAdmin);
                Swal.fire(
                    'Buen trabajo',
                    'Se agregó un nuevo administrador',
                    'success'
                ).then(function() {
                    location.href = "/pages/login.html";
                });
                // guardar en localstorage previo a la base de datos
                localStorage.setItem('listaAdminsT', JSON.stringify(listaAdmins));
                limpiarFormulario();
            } else {
                alerta.className = "alert alert-danger mt-4";
                alerta.innerHTML = "No se puede ingresar. No tiene clave de administrador !!";
            }
        } else {
            alerta.className = "alert alert-danger mt-4";
            alerta.innerHTML = "No se puede ingresar. La persona no es mayor de edad !!";
        }
    } else {
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = "Error ==> Las contraseñas no son iguales o ya existe el Id !!";
    }

}
function limpiarFormulario() {
    claveS.disabled = true;
    tipoUsuario[0].checked = true;
    formulario.reset();
    codigo.className = 'form-control';
    correo.className = 'form-control';
    anio.className = 'form-control';
    claveI.className = 'form-control';
    claveC.className = 'form-control';
    claveS.className = 'form-control';
}

cargaInicial();