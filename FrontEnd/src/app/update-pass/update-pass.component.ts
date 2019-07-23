import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent implements OnInit {

  hide = true;
  hide1 = true;
  hide2 = true;
  newPassword: string;
  repeatPassword: string;
  oldPassword: string;
  UpdatePassword: FormGroup;
  private sent: any;
  private incorrect: boolean;
  private correct: boolean;
  constructor(private formBuilder: FormBuilder, private http: UserService) { }

  ngOnInit() {
    this.UpdatePassword = this.formBuilder.group({
      NewPassword: [this.newPassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      RepeatPassword: [this.repeatPassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      OldPassword: [this.oldPassword, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]]
    });
    this.onChanges();
  }

  onSubmit() {
    this.UpdatePassword.value.User = sessionStorage.getItem('user');
    // console.log(this.UpdatePassword.value);
    const form = JSON.stringify(this.UpdatePassword.value);
    // console.log(form);
    if (this.passwordsMatch(this.UpdatePassword)) {
      this.http.postNP(form).subscribe(data => {
        this.sent = data;
        // console.log(this.sent);
        if (this.sent === 1) {
          this.incorrect = true;
        } else {
          this.correct = true;
          // console.log(this.sent);
        }
      });
    }
  }

  onChanges(): void {
    this.UpdatePassword.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }

  private passwordsMatch = (formP: FormGroup): boolean => {
    if (formP.controls.NewPassword.touched && formP.controls.RepeatPassword.touched) {
      return formP.value.NewPassword === formP.value.RepeatPassword;
    }
    return true;
  }
}
