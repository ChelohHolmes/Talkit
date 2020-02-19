import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface ISelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: RegisterService, public snackBar: MatSnackBar) { }

  password: string;
  confirmPassword: string;
  email: string;
  user: string;
  hide = true;
  hide1 = true;

  genders: ISelect[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'No binario', viewValue: 'No binario'}
  ];

  languages: ISelect[] = [
    {value: 'es', viewValue: 'Español'},
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'Français'},
    {value: 'de', viewValue: 'Deutsch'},
    {value: 'it', viewValue: 'Italiano'},
    {value: 'pt', viewValue: 'Português'},
    {value: 'ru', viewValue: 'русский'},
    {value: 'zh', viewValue: '中国'},
    {value: 'ja', viewValue: '日本語'},
    {value: 'ko', viewValue: '한국어'}
  ];
  sent: any;

  UserNew: FormGroup;
  used = false;
  match: boolean;

  ngOnInit() {
    this.UserNew = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      ConfirmPassword: [this.confirmPassword, [
        Validators.required
      ]],
      Email: [this.email, [
        Validators.required,
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ]],
      Name: new FormControl(),
      LastName: new FormControl(),
      Gender: new FormControl(),
      Birthday: new FormControl(),
      User: [this.user, [
        Validators.required,
        Validators.minLength(4)
      ]],
      NativeLanguage: new FormControl(),
    });

    this.onChanges();
  }

  onSubmit() {
    this.used = false;
    const form = JSON.stringify(this.UserNew.value);
    this.match = this.passwordsMatch(this.UserNew);
    if (this.match) {
      this.http.post(form).subscribe(data => {
        this.sent = data;
        // console.log(this.sent);
        if (this.sent === 1) {
          this.used = true;
        } else {
          this.http.posts(form).subscribe(dats => {
            this.sent = dats;
            console.log(this.sent);
            if (this.sent !== 0) {
              this.snackBar.open('Error al enviar correo', 'OK', {});
              this.http.postD(this.user).subscribe(dataD => {
                console.log(dataD);
              });
            } else {
              this.snackBar.open('Correo de verificación enviado', 'OK', {});
              // localStorage.setItem('register', this.UserNew.controls.Email.value);
            }
          });
          // this.router.navigate(['/Home']);
          // console.log('Home');
        }
      });
      if (this.used === false) {
        // Cerrar dialog
        // sessionStorage.setItem('user', this.UserNew.controls.User.value);
      }
    }
  }

  onChanges(): void {
    this.UserNew.valueChanges.subscribe(() => {
      this.used = false;
    });
  }

  passwordsMatch = (formP: FormGroup): boolean => {
    if (formP.controls.Password.touched && formP.controls.ConfirmPassword.touched) {
      return formP.value.Password === formP.value.ConfirmPassword;
    }
    return true;
  }
}
