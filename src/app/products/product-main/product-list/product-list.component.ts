import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../Producto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Product[];
  filtrados: Product[];
  monitoreados: number[];

  productSubscription = new Subscription();
  busqueda = '';
  routeisMonitoreado: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) {

    if (this.router.url === '/product') {
      this.routeisMonitoreado = true;
      this.productos = this.productService.getProducts();

      this.productService.productSubject.subscribe((data) => {
        this.productos = data;
        this.buscar();
    });
    } else {
      this.routeisMonitoreado = false;
      this.productos = this.productService.getMonitoreados().map((item) => this.productService.getProduct(item));

      this.productService.monitoreoSubject.subscribe((data) => {
        this.productos = data.map((item) => this.productService.getProduct(item));
        this.buscar();
      });
    }

  }

  ngOnInit(): void {
    this.monitoreados = [];
  }

  buscar() {
    this.filtrados =  this.productos.filter((item) => item.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) ||
    item.descripcion.toUpperCase().includes(this.busqueda.toUpperCase()));
  }

  productChange(prod: any) {
    console.log(prod.state);
    if (prod.state) {
      this.monitoreados.push(prod.id);
    } else {
      const index = this.monitoreados.findIndex((item) => item === prod.id);
      this.monitoreados.splice(index, 1);
    }
  }

  addMonitoreados() {
    this.monitoreados.forEach((item) => {
      this.productService.addMonitoreo(item);
    });
  }

}
