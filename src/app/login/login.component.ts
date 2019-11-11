import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, public apiService: ApiService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  
  onSubmit() {
    var response = this.apiService.checkAuthentication()
    if (response.username == this.loginForm.value.username && response.password == this.loginForm.value.password) {
      this.router.navigate(['/products']);
    }
    else {
      alert("Please Enter valid username and password");
      this.router.navigate(['/login']);
    }
  }
}
