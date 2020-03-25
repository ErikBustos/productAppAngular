import { Component, OnInit } from '@angular/core';
import { Product } from './Producto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productos: Product[];
  resBusqueda: Product[];
  productsBeforeSort: Product[];
  busqueda = '';
  constructor() {
    this.productos = [new Product(12, 'Smartphone', 'LG', 'Quadcore 3GHZ', 12018.5, 5, 'https://i.picsum.photos/id/1/100/100.jpg'),
    new Product(123, 'Smartwatch', 'Sony', '3GB Ram', 4999.9, 0, 'https://i.picsum.photos/id/2/100/100.jpg'),
    new Product(34, 'SmartTV', 'Sony', '52 pulgadas , Conexión wifi', 8999.9, 3, 'https://i.picsum.photos/id/28/100/100.jpg')];
    this.resBusqueda = this.productos;
  }

  ngOnInit(): void {
  }

  buscar(): void {
    this.resBusqueda = this.productos.filter(o =>
      o.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) ||
      o.descripcion.toUpperCase().includes(this.busqueda.toUpperCase())
    );
  }

  sortProducts($event): void {
    if ($event.target.checked === true) {
      this.productsBeforeSort = this.resBusqueda.slice();
      this.resBusqueda.sort((a, b) => (a.precio > b.precio) ? 1 : -1);
    } else {
      this.resBusqueda = this.productsBeforeSort;
    }
  }

  filterbyExistencia($event): void {
    if ($event.target.checked === true) {
      console.log('exist');
      this.resBusqueda = this.resBusqueda.filter(
        o => o.existencia > 0
      );
    } else {
      this.buscar();
    }
  }

  resaltarExistenciaMayor($event): void {
    if ($event.target.checked === true) {
      for (const p of this.resBusqueda) {
        if (p.existencia > 3) {
          p.color = 1;
        }
      }
    } else {
      for (const p of this.resBusqueda) {
        p.color = 0;
      }
    }
  }

}
