import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {RecoveryComponent} from '../recovery/recovery.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private sent: any;
  private incorrect: boolean;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private http: LoginService, private router: Router) { }

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
    this.onChanges();
  }

  onSubmit() {
    const form = JSON.stringify(this.UserLogin.value);
    this.http.post(form).subscribe(data => {
      this.sent = data;
      console.log(this.sent);
      if (this.sent === 1) {
        this.incorrect = true;
      } else {
        this.router.navigate(['/Home']);
        console.log('Home');
        sessionStorage.setItem('user', this.UserLogin.controls.User.value);
        // return true;
      }
    });
  }

  onRecovery() {
    this.dialog.open(RecoveryComponent);
  }

  onChanges(): void {
    this.UserLogin.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }
}
