import {Component, HostListener, OnInit} from '@angular/core';
import {ToolbarService} from '../services/toolbar.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  user: any;
  points: any;

  constructor(private http: ToolbarService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // window.prompt('hola', 'lol');
    this.user = sessionStorage.getItem('user');
    console.log(this.user);
    this.http.postP(this.user).subscribe(data => {
      this.points = data;
      // console.log(this.points);
    });
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
