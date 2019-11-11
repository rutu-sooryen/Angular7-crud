import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getProductDetails(){
   return this.http.get('assets/product-details.json');
  }

}
