import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { ProductDataModel } from '../model/product-data.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  productDataModel: ProductDataModel[];
  dataSource: any;
  displayedColumns = ['position', 'name', 'weight', 'price', 'edit', 'delete'];
  selection : any;
  numSelected : any;

  constructor(private router: Router,public apiService: ApiService) { }


  ngOnInit() {
    var response = this.apiService.getProducts();
    this.productDataModel = response;
    this.dataSource = new MatTableDataSource(this.productDataModel);
    this.selection = new SelectionModel<ProductDataModel>(true, []);
    this.numSelected = this.selection.selected.length;

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(pid: number) {
    this.productDataModel.forEach(item => {
      let index: number = this.productDataModel.findIndex(d => d === item);
      console.log(this.productDataModel.findIndex(d => d === item));
      this.productDataModel.splice(index,-1);
      this.dataSource = new MatTableDataSource<ProductDataModel>(this.productDataModel);
    });
    this.selection = new SelectionModel<ProductDataModel>(true, []);

  }

  editProduct (id: number) {
    this.router.navigate([`product-edit/id:`]);


  }
}