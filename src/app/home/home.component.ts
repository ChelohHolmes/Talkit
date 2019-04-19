import { Component, OnInit } from '@angular/core';
import {TranslatorComponent} from '../translator/translator.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened: boolean;
  bMews: boolean;
  bRandom: boolean;
  bCustom: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.onNews();
  }

  onNews() {
    this.bMews = true;
    this.bRandom = false;
    this.bCustom = false;
  }

  onRandom() {
    this.bMews = false;
    this.bRandom = true;
    this.bCustom = false;
  }

  onCustom() {
    this.bMews = false;
    this.bRandom = false;
    this.bCustom = true;
  }

  onTranslator() {
    this.dialog.open(TranslatorComponent);
  }

}
