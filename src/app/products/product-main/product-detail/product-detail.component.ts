import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Producto';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.product = this.productService.getProduct(Number(this.id));
    console.log('./');
  }

}
