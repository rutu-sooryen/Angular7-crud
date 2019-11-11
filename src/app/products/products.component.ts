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

  constructor(private router: Router, public apiService: ApiService) { }

  displayedColumns = ['position', 'name', 'weight', 'price', 'edit', 'delete'];
  dataSource : any;
  selection: any;
  jsonData = [];

  ngOnInit() {
    var response = this.apiService.getProducts();
    this.jsonData = Object.assign(response);
    this.dataSource = new MatTableDataSource<ProductDataModel>(this.jsonData);
    this.selection = new SelectionModel<ProductDataModel>(true, []);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.jsonData.findIndex(d => d === item);
      console.log(this.jsonData.findIndex(d => d === item));
      this.jsonData.splice(index, 1)
      this.dataSource = new MatTableDataSource<ProductDataModel>(this.jsonData);
    });
    this.selection = new SelectionModel<ProductDataModel>(true, []);
  }

}
