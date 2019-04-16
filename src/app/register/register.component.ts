import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  UserNew: FormGroup;
  ngOnInit() {
    this.UserNew = new FormGroup({
      Name: new FormControl(),
      LastName: new FormControl(),
      Email: new FormControl(),
      Gender: new FormControl(),
      Birthday: new FormControl(),
      User: new FormControl(),
      NativeLanguage: new FormControl(),
      Password: new FormControl(),
      ConfirmPassword: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.UserNew.value);
    const form = JSON.stringify(this.UserNew.value);
    console.log(form);
  }

}
