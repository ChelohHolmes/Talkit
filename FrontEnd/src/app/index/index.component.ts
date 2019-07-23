import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {
    this.openSnackBar();
  }

  ngOnInit() {
  }

  openSnackBar() {
    const cookies = localStorage.getItem('cookies');
    if (!cookies) {
      const snackBarRef = this.snackBar.open('Este sitio web utiliza cookies para mejorar tu experiencia de navegación', 'OK', {});
      snackBarRef.onAction().subscribe(() => {
        localStorage.setItem('cookies', '1');
      });
    }
    }
}
