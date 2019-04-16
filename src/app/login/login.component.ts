import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  UserLogin: FormGroup;
  ngOnInit() {
    this.UserLogin = new FormGroup({
      User: new FormControl(),
      Password: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.UserLogin.value);
    const form = JSON.stringify(this.UserLogin.value);
    console.log(form);
  }

}
