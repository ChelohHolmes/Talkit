import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RecoverService} from '../services/recover.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  email: string;
  Recovery: FormGroup;
  sent: any;

  constructor(private formBuilder: FormBuilder, private http: RecoverService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.Recovery = this.formBuilder.group({
      Email: [this.email, [
        Validators.required,
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ]]
    });
  }

  onSubmit() {
    const form = JSON.stringify(this.Recovery.value);
    // console.log(form);
    this.http.post(form).subscribe(data => {
      this.sent = data;
      // console.log(this.sent);
      if (this.sent === 0) {
        // localStorage.setItem('Email', this.Recovery.controls.Email.value);
        this.snackBar.open('Correo enviado.', 'OK');
        // console.log('Saved');
      }
    });
  }
}
