export class LibroN{
    constructor(){
        this.codigo = null;
        this.nombre = null;
        this.autor = null;
        this.categoria = null;
        this.paginas = null;
        this.direccion = null;
        this.precio = null;
    }

    set nuevoCodigo(codigo){
        this.codigo = codigo;
    }
    set nuevoNombre(nombre){
        this.nombre = nombre;
    }
    set nuevoAutor(autor){
        this.autor = autor;
    }
    set nuevaCategoria(categoria){
        this.categoria = categoria;
    }
    set nuevasPaginas(paginas){
        this.paginas = paginas;
    }
    set nuevaDireccion(direccion){
        this.direccion = direccion;
    }
    set nuevoPrecio(precio){
        this.precio = precio;
    }

    get mostrarCodigo(){
        return this.codigo;
    }
    get mostrarNombre(){
        return this.nombre;
    }
    get mostrarAutor(){
        return this.autor;
    }
    get mostrarCategoria(){
        return this.categoria;
    }
    get mostrarPaginas(){
        return this.paginas;
    }
    get mostrarDireccion(){
        return this.direccion;
    }
    get mostrarPrecio(){
        return this.precio;
    }
}