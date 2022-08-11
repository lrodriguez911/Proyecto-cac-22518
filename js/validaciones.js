
export function validarCodigo(input){
    if (input.value.trim() != "" && input.value.trim().length >= 3){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}


export function validarNumeros(input){
    let patron = /^[0-9]{2,3}$/;
    if (patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarAnio(input){
    let patron = /^[0-9]{4}$/;
    if (patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarCorreo(input){
    let patron = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarCampoRequerido(input){
    if (input.value.trim().length > 0){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGeneralP(){
    let alerta = document.getElementById('msjAlerta');
    if (validarCodigo(codigo) && validarCampoRequerido(nombre) && validarCampoRequerido(autor) && validarNumeros(paginas) 
    && validarCampoRequerido(precio) && validarCampoRequerido(direccion) ){
        alerta.className = "alert alert-danger mt-4 d-none";
        return true;
    }else{
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = "No se puede ingresar. Datos incorrectos.!";
        return false;
    }
    
}

export function validarInvitado(){
    let alerta = document.getElementById('msjAlerta');
    if (validarCampoRequerido(codigo) && validarCorreo(correo) && validarAnio(anio) && 
        validarCampoRequerido(claveI) && validarCampoRequerido(claveC)){
        alerta.className = "alert alert-danger mt-4 d-none";
        return true;
    }else{
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = "No se puede ingresar. Datos incorrectos.!";
        return false;
    }
}

export function validarAdmin(){
    let alerta = document.getElementById('msjAlerta');
    if (validarCodigo(codigo) && validarCorreo(correo) && validarAnio(anio) && 
        validarCampoRequerido(confirmacion) && validarCampoRequerido(claveI) && validarCampoRequerido(claveC)){
        alerta.className = "alert alert-danger mt-4 d-none";
        return true;
    }else{
        alerta.className = "alert alert-danger mt-4";
        alerta.innerHTML = "No se puede ingresar. Datos incorrectos.!";
        return false;
    }
}

export function validarLogin(){
    if (validarCampoRequerido(usuario) && validarCampoRequerido(password)){
        return true;
    }else{
        return false;
    }
}

export function validarContrasena(){
    if (validarCampoRequerido(claveC) && validarCampoRequerido(claveI)){
        return true;
    }else{
        return false;
    }
}

export function validarComent(){
    if (validarCampoRequerido(mensaje)){
        return true;
    }else{
        return false;
    }
}
