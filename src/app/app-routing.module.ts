import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './products/product-main/product-list/product/product.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { ProductListComponent } from './products/product-main/product-list/product-list.component';
import { ProductEditComponent } from './products/product-main/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-main/product-detail/product-detail.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'monitoreo', component: ProductMainComponent,
    children: [{path: '', component: ProductListComponent}]},
  {path: 'product', component: ProductMainComponent,
    children : [
      {path: '', component: ProductListComponent},
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent},
      {path: ':id/edit', component: ProductEditComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
