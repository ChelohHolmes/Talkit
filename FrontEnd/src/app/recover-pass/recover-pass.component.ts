import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverService} from '../services/recover.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent implements OnInit {
  match: boolean;
  sent: any;

  constructor(private formBuilder: FormBuilder,
              private http: RecoverService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) { }
  UserNew: FormGroup;
  password: string;
  confirmPassword: string;
  hide = true;
  hide1 = true;
  token: string;

  ngOnInit() {

    this.UserNew = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      ConfirmPassword: [this.confirmPassword, [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
    this.UserNew.value.Token = this.token;
    const form = JSON.stringify(this.UserNew.value);
    // console.log(this.UserNew.value);
    this.match = this.passwordsMatch(this.UserNew);
    console.log(form);
    if (this.match) {
      // this.email = localStorage.getItem('Email');
      this.http.posts(form).subscribe(data => {
        this.sent = data;
        console.log(this.sent);
        if (this.sent === 1) {
          const snackBarRef = this.snackBar.open('Contraseña cambiada.', 'OK');
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/']);
          });
          // localStorage.removeItem('Email');
        } else {
          this.snackBar.open('Error.', 'OK');
        }
      });
    }

  }

  passwordsMatch = (formp: FormGroup): boolean => {
    if (formp.controls.Password.touched && formp.controls.ConfirmPassword.touched) {
      return formp.value.Password === formp.value.ConfirmPassword;
    }
    return true;
  }

}
