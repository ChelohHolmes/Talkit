import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  strings: any;

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
  }

  openSnackBar() {
    this.snackBar.open('¡Celebremos en una sala!', '¡Vamos!', {
      duration: 2000
    });
  }
}
