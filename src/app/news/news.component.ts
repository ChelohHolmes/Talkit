import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  openSnackBar() {
    this.snackBar.open('¡Celebremos en una sala!', '¡Vamos!', {
      duration: 2000
    });
  }
}
