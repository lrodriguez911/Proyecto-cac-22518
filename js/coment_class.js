export class ComentarioN{
    constructor(){
        this.usuario = null;
        this.mensaje = null;
        this.codigo = null;
        this.nombre = null;
    }

    set nuevoUsuario(usuario){
        this.usuario = usuario;
    }
    set nuevoMensaje(mensaje){
        this.mensaje = mensaje;
    }
    set nuevoCodigo(codigo){
        this.codigo = codigo;
    }
    set nuevoNombre(nombre){
        this.nombre = nombre;
    }

    get mostrarUsuario(){
        return this.usuario;
    }
    get mostrarMensaje(){
        return this.mensaje;
    }
    get mostrarCodigo(){
        return this.codigo;
    }
    get mostrarNombre(){
        return this.nombre;
    }
}