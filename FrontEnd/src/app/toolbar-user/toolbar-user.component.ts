import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../services/toolbar.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent} from '../confirmation/confirmation.component';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  user: any;
  points: any;
  strings: any;
  votes: any;
  inRoom: boolean;
  searching: boolean;
  isLoaded: Promise<boolean>;
  interval;

  constructor(private http: ToolbarService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    // window.prompt('hola', 'lol');
    this.user = sessionStorage.getItem('user');
    // console.log(this.user);
    this.http.postSEP(sessionStorage.getItem('user')).subscribe(data => {
      // console.log(data[0].lengua_mater);
      if (data[0].idioma === 'Español') {
        this.strings = spanish;
        localStorage.setItem('lan', 'es');
      } else {
        this.strings = english;
        localStorage.setItem('lan', 'en');
      }
      this.isLoaded = Promise.resolve(true);
    });
    this.showData();
    if (this.user && sessionStorage.getItem('connected')) {
      this.http.postChange(this.user).subscribe(() => {
      });
    }
    this.interval = setInterval(() => {
      this.changeBar();
    }, 1000);
    setInterval(() => {
      this.showData();
    }, 15000);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.http.postD(this.user).subscribe(() => {
    });
  }

  onCS() {
    this.http.postD(this.user).subscribe(data => {
      if (data) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('connected');
        this.router.navigate(['/']);
      } else {
        this.snackBar.open('Error al cerrar sesión.', 'OK');
      }
    });
  }

  showData() {
    this.http.postP(this.user).subscribe(data => {
      this.points = data[0].puntos;
      this.votes = data[0].votos;
    });
  }

  changeBar() {
    this.inRoom = sessionStorage.getItem('room') !== null;
    this.searching = sessionStorage.getItem('r') !== null;
  }

  exit(i, l) {
    const dialog = this.dialog.open(ConfirmationComponent);
    dialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        if (!l) {
          sessionStorage.removeItem('room');
        } else {
          sessionStorage.setItem('destroy', '1');
        }
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('custom');
        this.inRoom = false;
        this.searching = false;
        if (!i) {
          this.router.navigate(['/Home']);
        } else {
          this.router.navigate(['/Configuration']);
        }
      }
    });
  }
}
