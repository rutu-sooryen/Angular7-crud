import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';
import { ProductDataModel } from '../model/product-data.model';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  productDataModel: ProductDataModel;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, public cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      prod_name: new FormControl('', [Validators.required]),
      prod_weight: new FormControl('', [Validators.required]),
      prod_price: new FormControl('', [Validators.required]),
    });

    const productdetail = this.cookieService.get('data');
    var obj = JSON.parse(productdetail);
    this.productForm.controls.prod_name.setValue(obj.name);
    this.productForm.controls.prod_weight.setValue(obj.weight);
    this.productForm.controls.prod_price.setValue(obj.price);
  }

  onFormSubmit(form: NgForm) {
    alert('Your data saved successfully!');
    this.productForm.reset();
  }
}
