import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomService} from '../services/custom.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custom-pass',
  templateUrl: './custom-pass.component.html',
  styleUrls: ['./custom-pass.component.scss']
})
export class CustomPassComponent implements OnInit {
  private sent: any;

  constructor(private formBuilder: FormBuilder, private http: CustomService, private router: Router) { }

  CustomPass: FormGroup;
  password: string;
  hide = true;
  incorrect: any;

  ngOnInit() {
    this.CustomPass = this.formBuilder.group({
      Password: [this.formBuilder, [
        Validators.required
      ]]
    });
    this.onChanges();
  }

  onSubmit() {
    this.CustomPass.value.room = sessionStorage.getItem('r');
    this.CustomPass.value.user = sessionStorage.getItem('user');
    const form = JSON.stringify(this.CustomPass.value);
    this.http.postPass(form).subscribe(data => {
      this.sent = data;
      console.log(this.sent);
      if (this.sent === 0) {
        this.incorrect = true;
      } else {
        this.router.navigate(['/']);
        console.log('Home');
        sessionStorage.removeItem('r');
        // sessionStorage.setItem('user', this.UserLogin.controls.User.value);
        // return true;
      }
    });
  }

  private onChanges() {
    this.CustomPass.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }

  // @HostListener('window:beforeunload', ['event'])
  doSomething() {
    sessionStorage.removeItem('r');
    console.log('Eliminado');
  }
}
