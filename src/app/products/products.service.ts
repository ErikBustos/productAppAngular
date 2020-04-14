import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  monitoreados: number[];
  marcas: string[];

  productSubject = new BehaviorSubject<Product[]>([]);
  monitoreoSubject = new BehaviorSubject<number[]>([]);

  constructor() {
    this.products = [new Product(12, 'Smartphone', 'LG', 'Quadcore 3GHZ', 12018.5, 5,
                      [new Especificacion('memoria ram' , 4, 'GB'),
                        new Especificacion('memoria interna', 64, 'GB'),
                        new Especificacion('SO', 'android 9', '')]),
                      new Product(123, 'Smartwatch', 'Sony', '3GB Ram', 4999.9, 0, []),
                      new Product(34, 'SmartTV', 'Sony', '52 pulgadas , Conexión wifi', 8999.9, 3, [])
                    ];
    this.monitoreados = [];
    this.productSubject.next(this.getProducts());
    this.monitoreoSubject.next(this.getMonitoreados());
    this.marcas = ['LG', 'Sony', 'HP'];

  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(id: number) {
    const index = this.products.findIndex((item) => item.uid === id);
    return JSON.parse(JSON.stringify(this.products[index]));
  }
  getMonitoreados() {
    return this.monitoreados.slice();
  }

  getMarcas() {
    return this.marcas.slice();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productSubject.next(this.getProducts());
  }

  addMonitoreo(id: number) {
    if (!this.monitoreados.includes(id)) {
      this.monitoreados.push(id);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  addMarca(marca: string) {
    this.marcas.push(marca);
  }

  deleteProduct(id: number) {
    let index = this.products.findIndex((item) => item.uid === id);
    this.products.splice(index, 1);
    this.productSubject.next(this.getProducts());

    index = this.monitoreados.findIndex((item) => item === id);
    if (index !== -1) {
      this.monitoreados.splice(index, 1);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  deleteMonitoreado(id: number) {
    const index = this.monitoreados.findIndex((item) => item === id);
    if (index !== -1) {
      this.monitoreados.splice(index, 1);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  updateProduct(editProduct: Product) {
    const index = this.products.findIndex((item) => item.uid === editProduct.uid);
    this.products[index] = editProduct;
    this.productSubject.next(this.getProducts());
  }

}
