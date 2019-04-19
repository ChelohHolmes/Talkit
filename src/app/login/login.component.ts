import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {RecoveryComponent} from '../recovery/recovery.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) { }

  password: string;
  user: string;
  UserLogin: FormGroup;
  hide = true;

  ngOnInit() {
    this.UserLogin = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128)
      ]],
      User: [this.user, [
        Validators.required,
      ]]
    });
  }

  onSubmit() {
    console.log(this.UserLogin.value);
    const form = JSON.stringify(this.UserLogin.value);
    console.log(form);
  }

  onRecovery() {
    this.dialog.open(RecoveryComponent);
  }
}
