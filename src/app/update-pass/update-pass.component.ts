import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent implements OnInit {

  hide = true;
  hide1 = true;
  hide2 = true;
  newpassword: string;
  repeatpassword: string;
  oldpassword: string;
  UpdatePassword: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.UpdatePassword = this.formBuilder.group({
      NewPassword: [this.newpassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      RepeatPassword: [this.repeatpassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      OldPassword: [this.oldpassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]]
    });
  }

  onSubmit() {
    console.log(this.UpdatePassword.value);
    const form = JSON.stringify(this.UpdatePassword.value);
    console.log(form);
  }
  private passwordsMatch = (formP: FormGroup): boolean => {
    if (formP.controls.NewPassword.touched && formP.controls.RepeatPassword.touched) {
      return formP.value.NewPassword === formP.value.RepeatPassword;
    }
    return true;
  }
}
