import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomService} from '../services/custom.service';
import {Router} from '@angular/router';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';
import {MatDialogRef} from '@angular/material/dialog';
import {Md5} from 'ts-md5';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-pass',
  templateUrl: './custom-pass.component.html',
  styleUrls: ['./custom-pass.component.scss']
})
export class CustomPassComponent implements OnInit {
  pass: any;
  sent: any;
  strings: any;
  isPrivate: any;
  isUndefined: boolean;
  description: boolean;
  rules: boolean;
  currentUsers: number;
  maxUsers: number;
  hasMod: boolean;
  mod: boolean;
  joinable: boolean;
  type: any;

  constructor(private formBuilder: FormBuilder, private http: CustomService, private router: Router, private dialogRef: MatDialogRef<CustomPassComponent>, private snack: MatSnackBar) { }

  CustomPass: FormGroup;
  password: string;
  hide = true;
  incorrect: any;

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.CustomPass = this.formBuilder.group({
      Password: [this.formBuilder, [
        Validators.required
      ]]
    });
    // console.log('holas');
    const room = sessionStorage.getItem('r');
    // console.log(room);
    this.http.postRules(room).subscribe(data => {
      // console.log(data);
      this.sent = data;
      // console.log(this.sent[0]);
      this.isPrivate = this.sent[0].privacidad === 'Privada';
      console.log(this.isPrivate);
      this.description = this.sent[0].descripcion !== 'No';
      // this.rules = this.sent[0].rules !== 'No';
      this.currentUsers = +this.sent[0].participantes;
      this.maxUsers = +this.sent[0].participantes_cant;
      this.hasMod = this.sent[0].moderador === 't';
      this.mod = this.sent[0].moderador_estatus === 't';
      this.joinable = this.currentUsers < this.maxUsers;
      this.type = this.sent[0].tipo_conv;
    });
    this.isUndefined = this.isPrivate === undefined;
    this.onChanges();
  }

  onSubmit() {
    this.CustomPass.value.room = sessionStorage.getItem('r');
    this.CustomPass.value.user = sessionStorage.getItem('user');
    const form = JSON.stringify(this.CustomPass.value);
    this.http.postPass(form).subscribe(data => {
      this.pass = data;
      // console.log(this.pass);
      this.incorrect = this.pass === 0;
      // this.dialogRef.close();
      // sessionStorage.setItem('room', sessionStorage.getItem('r'));
      // sessionStorage.setItem('custom', '1');
      // const md5 = new Md5();
      // const lol = md5.appendStr(sessionStorage.getItem('room')).end();
      // this.router.navigate(['/lobby/' + lol]);
      // console.log('Home');
      // sessionStorage.removeItem('r');
      // sessionStorage.setItem('user', this.UserLogin.controls.User.value);
    });
  }

  onChanges() {
    this.CustomPass.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }

  join(asMod) {
    if (this.joinable) {
      const form = JSON.stringify({user: sessionStorage.getItem('user'), room: sessionStorage.getItem('r'), mod: asMod} );
      this.http.postJoin(form).subscribe(data => {
        if (data === 1) {
          sessionStorage.setItem('room', sessionStorage.getItem('r'));
          sessionStorage.removeItem('r');
          sessionStorage.setItem('custom', '1');
          sessionStorage.setItem('type', this.type);
          const md5 = new Md5();
          const lol = md5.appendStr(sessionStorage.getItem('room')).end();
          console.log('/lobby?r=' + lol);
          this.dialogRef.close();
          this.router.navigate(['/lobby/' + lol]);
        } else {
          this.snack.open('Hubo un problema al entrar.', 'OK');
        }
      });
    }
  }
}

/*
console.log(this.sent[index].no_salap);
    if (this.sent[index].privacidad === 'Privada') {
      if (this.points >= 2) {
        sessionStorage.setItem('r', this.sent[index].no_salap);
        const dialog = this.dialog.open(CustomPassComponent);
        dialog.afterClosed().subscribe(() => {
          sessionStorage.removeItem('r');
        });
      } else {
        this.snack.open('Puntos insuficientes', 'OK');
      }
    } else {
      if (this.points >= 1) {
        const form = JSON.stringify({user: sessionStorage.getItem('user'), room: this.sent[index].no_salap} );
        console.log(form);
        this.http.postJoin(form).subscribe(data => {
          if (data === 1) {
            sessionStorage.setItem('room', this.sent[index].no_salap);
            const md5 = new Md5();
            const lol = md5.appendStr(sessionStorage.getItem('room')).end();
            this.router.navigate(['/lobby?r=' + lol]);
          } else {
            this.snack.open('Hubo un problema al entrar.', 'OK');
          }
        });
      } else {
        this.snack.open('Puntos insuficientes', 'OK');
      }
    }
 */
