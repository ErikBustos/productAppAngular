export class Product {
    uid: number;
    nombre: string;
    marca: string;
    descripcion: string;
    precio: number;
    existencia: number;
    imagenURL: string;
  color: number;
    constructor(uid, nombre, marca, descripcion, precio, existencia, imagen) {
        this.uid = uid;
        this.nombre = nombre;
        this.marca = marca;
        this.descripcion = descripcion;
        this.precio = precio;
        this.existencia = existencia;
        this.imagenURL = imagen;
    }
}
