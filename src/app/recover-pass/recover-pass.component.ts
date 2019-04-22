import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  UserNew: FormGroup;
  password: string;
  confirmpassword: string;
  hide = true;
  hide1 = true;

  ngOnInit() {

    this.UserNew = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      ConfirmPassword: [this.confirmpassword, [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    console.log(this.UserNew.value);
    const form = JSON.stringify(this.UserNew.value);
    console.log(form);
    console.log(this.passwordsMatch(this.UserNew));
  }

  private passwordsMatch = (formp: FormGroup): boolean => {
    if (formp.controls['Password'].touched && formp.controls['ConfirmPassword'].touched) {
      if (formp.value.Password === formp.value.ConfirmPassword) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }


}
