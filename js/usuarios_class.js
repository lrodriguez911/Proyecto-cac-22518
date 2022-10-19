export class UsuarioN{
    constructor(){
        this.codigo = null;
        this.correo = null;
        this.anio = null;
        this.contrasena = null;
    }

    set nuevoCodigo(codigo){
        this.codigo = codigo;
    }
    set nuevoCorreo(correo){
        this.correo = correo;
    }
    set nuevoAnio(anio){
        this.anio = anio;
    }
    set nuevaContrasena(contrasena){
        this.contrasena = contrasena;
    }

    get mostrarId(){
        return this.id;
    }
    get mostrarCorreo(){
        return this.correo;
    }
    get mostrarAnio(){
        return this.anio;
    }
    get mostrarContrasena(){
        return this.contrasena;
    }

    esMayor(){
        let edad = 2021 - this.anio;
        if (edad >= 18){
            return true;
        }else{
            return false;
        }
    }

}

export class AdminS extends UsuarioN{
    constructor(){
        super();
        this.confirmar = "12345";
    }

    confirmarAdmin(clave){
        if(clave === this.confirmar){
            return true;
        }else{
            return false;
        }
    }
}