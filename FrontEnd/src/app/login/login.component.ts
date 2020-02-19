import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {RecoveryComponent} from '../recovery/recovery.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sent: any;
  incorrect: boolean;
  isBanned: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private http: LoginService, private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

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
      // console.log(this.sent);
      if (this.sent === 1) {
        this.incorrect = true;
      } else if (this.sent === 2) {
        this.isBanned = true;
      } else {
        this.dialogRef.close();
        this.router.navigate(['/Home']);
        // console.log('Home');
        sessionStorage.setItem('user', this.UserLogin.controls.User.value);
        sessionStorage.setItem('connected', '1');
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
