import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import data from '../includes/product-details.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  products: string[];
  checkAuthentication() {
      var userInfo = {
      username:"rutu", 
      password:"rutu@123"
    }
    return userInfo;
  }

  getProducts (){
    return data;
  }
  
  getProduct(id: number) {
    
  }
  
  addProduct (product) {
    
  }
  
  updateProduct (id, product) {
    
  }
  
  deleteProduct (id) {
    
  }
}
