import {Component, HostListener, OnInit} from '@angular/core';
import {ToolbarService} from '../services/toolbar.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  user: any;
  points: any;
  strings: any;

  constructor(private http: ToolbarService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // window.prompt('hola', 'lol');
    this.user = sessionStorage.getItem('user');
    console.log(this.user);
    this.http.postP(this.user).subscribe(data => {
      this.points = data;
      // console.log(this.points);
    });
    this.http.postSEP(sessionStorage.getItem('user')).subscribe(data => {
      // console.log(data[0].lengua_mater);
      if (data[0].idioma === 'Español') {
        this.strings = spanish;
      } else {
        this.strings = english;
      }
      console.log(this.strings.hi);
      console.log(data[0].idioma);
    });
    // console.log(spanish.hi);
  }

  @HostListener('window:onbeforeunload')
  beforeunloadHandler(event) {
    // window.prompt('Cerrar o algo', 'Hamana');
    // console.log($event);
    event.returnValue = 'Hola, buenas noches';
    console.log('Hola.s');
    this.http.postP(this.user);
  }

  onCS() {
    this.http.postD(this.user).subscribe(data => {
      if (data) {
        sessionStorage.removeItem('user');
        this.router.navigate(['/']);
      } else {
        this.snackBar.open('Error al cerrar sesión.', 'OK');
      }
    });
  }
}
