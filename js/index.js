let iniciar = document.getElementById('iniciarS');
let cerrar = document.getElementById('cerrarS');
let saludo = document.getElementById('iniSes');
let listaLogin = null;

iniciar.addEventListener('click', () => { iniciarSesion() });
cerrar.addEventListener('click', () => { cerrarSesion() });

const cargaInicial = () => {
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        iniSesion(listaLogin[0]);
    }
}

function iniciarSesion(){
    location.href = "/pages/login.html";
}

const inicioOK = () => {
    listaLogin = JSON.parse(localStorage.getItem('listaLoginU')) || [];
    if (listaLogin.length > 0) {
        return true;
    }else{
        return false;
    }
}

function iniSesion(usuarioC) {
    saludo.innerHTML = `Hola, ${usuarioC.codigo}`;
}

function cerrarSesion() {
    if (inicioOK()){
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
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has iniciado sesion',
            footer: '<a href="">¿Por que sucedio esto?</a>'
        }).then(function() {
            location.href = "/pages/login.html";
        });
    }
    
}

function finSesion() {
    saludo.innerHTML = `Iniciar sesión...`;
}

cargaInicial();