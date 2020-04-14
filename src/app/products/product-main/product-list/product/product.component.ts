import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../../../Producto';
import { ProductsService } from 'src/app/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() prod: Product;
  @Output() checkBoxState = new EventEmitter();
  checkbox: boolean;

  constructor(private productService: ProductsService,
              private router: Router) {

  }

  ngOnInit(): void {
  }

  handleChangeCheckBox() {
    this.checkBoxState.emit({id: this.prod.uid, state: this.checkbox});
  }

  deleteProduct() {
    if (this.router.url === '/monitoreo') {
      this.productService.deleteMonitoreado(this.prod.uid);
    } else if (this.router.url === '/product') {
      this.productService.deleteProduct(this.prod.uid);
      this.productService.deleteMonitoreado(this.prod.uid);
    }
  }

}
