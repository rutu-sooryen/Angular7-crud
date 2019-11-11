import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { ProductDataModel } from '../model/product-data.model';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private router: Router, public apiService: ApiService, public cookieService: CookieService) { }

  displayedColumns = ['position', 'name', 'weight', 'price', 'edit', 'delete'];
  productDataModel: ProductDataModel;
  dataSource: any;
  selection: any;
  jsonData: any;

  ngOnInit() {
    this.apiService.getProductDetails().subscribe((data: ProductDataModel[]) => {
      this.jsonData = data;
      this.dataSource = new MatTableDataSource<ProductDataModel>(data);
      this.selection = new SelectionModel<ProductDataModel>(true, []);
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.jsonData.findIndex(d => d === item);
      this.jsonData.splice(index, 1)
      this.dataSource = new MatTableDataSource<ProductDataModel>(this.jsonData);
    });
    this.selection = new SelectionModel<ProductDataModel>(true, []);
  }

  editProduct(pid) {
    this.productDataModel = this.jsonData.filter(function (obj) {
      return obj.id == pid;
    })[0];
    this.cookieService.set('data', JSON.stringify(this.productDataModel));
    this.router.navigate(['product-edit', pid]);
  }

}
