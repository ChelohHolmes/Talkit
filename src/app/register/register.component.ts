import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


export interface IGender {
  value: string;
  viewValue: string;
}

export interface ILanguage {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  password: string;
  confirmpassword: string;
  email: string;
  hide = true;
  hide1 = true;

  genders: IGender[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'No binario', viewValue: 'No binario'}
  ];

  languages: ILanguage[] = [
    {value: 'Español', viewValue: 'Español'},
    {value: 'Inglés', viewValue: 'English'},
    {value: 'Francés', viewValue: 'Français'},
    {value: 'Alemán', viewValue: 'Deutsch'},
    {value: 'Italiano', viewValue: 'Italiano'},
    {value: 'Portugués', viewValue: 'Português'},
    {value: 'Ruso', viewValue: 'русский'},
    {value: 'Chino', viewValue: '中国'},
    {value: 'Japonés', viewValue: '日本語'},
    {value: 'Coreano', viewValue: '한국어'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  UserNew: FormGroup;

  ngOnInit() {

    this.UserNew = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      ConfirmPassword: [this.confirmpassword, [
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
      User: new FormControl(),
      NativeLanguage: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.UserNew.value);
    const form = JSON.stringify(this.UserNew.value);
    console.log(form);
  }

  private passwordsMatch = (formP: FormGroup): boolean => {
    if (formP.controls['Password'].touched && formP.controls['ConfirmPassword'].touched) {
      if (formP.value.Password === formP.value.ConfirmPassword) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

}
