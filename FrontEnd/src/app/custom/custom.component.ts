import { Component, OnInit } from '@angular/core';
import {ISelect} from '../register/register.component';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {CustomService} from '../services/custom.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomPassComponent} from '../custom-pass/custom-pass.component';
import {Router} from '@angular/router';
import {CustomCreateComponent} from '../custom-create/custom-create.component';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  initial1 = 'null';
  initial2 = 'null';
  initial3 = 'null';
  initial4 = 'null';
  private sent: any;
  moderator = [];
  changeSubject = [];
  size: number;
  private points: any;
  strings: any;

  languages: ISelect[];
  Temas: ISelect [];
  Niveles: ISelect [];
  Chats: ISelect [];
  Search: FormGroup;

  displayedColumns: string[] = [
    'position',
    'chat',
    'topic',
    'language',
    'participants',
    'moderator',
    'level',
    'kicking',
    'privacy',
    'button'
  ];

  constructor(private formBuilder: FormBuilder,
              private http: CustomService,
              private dialog: MatDialog,
              private router: Router,
              private snack: MatSnackBar,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.arrays();
    this.Search = this.formBuilder.group(   {
      Topics: new FormControl(),
      Languages: new FormControl(),
      Level: new FormControl(),
      Chats: new FormControl()
  });
    this.http.post().subscribe(data => {
      this.sent = data;
      // console.log(this.sent);
      this.size = this.sent.length;
      for (let i = 0; i < this.size; i++) {
        if (this.sent[i].privacidad === 'Privada') {
          this.sent[i].privacy = 'lock';
        } else {
          this.sent[i].privacy = 'lock_open';
        }
        this.moderator[i] = this.sent[i].moderador === 't';
        this.changeSubject[i] = this.sent[i].cambio_tema === 't';
      }
    });
    this.http.postPoints(sessionStorage.getItem('user')).subscribe(data => {
      this.points = data[0].puntos;
    });
  }

  onSubmit() {
    const form = JSON.stringify(this.Search.value);
    // console.log(form);
    this.http.postFilter(form).subscribe(data => {
      // console.log(data);
      this.sent = data;
      this.size = this.sent.length;
      for (let i = 0; i < this.size; i++) {
        if (this.sent[i].privacidad === 'Privada') {
          this.sent[i].privacy = 'lock';
        } else {
          this.sent[i].privacy = 'lock_open';
        }
        this.moderator[i] = this.sent[i].moderador === 't';
        this.changeSubject[i] = this.sent[i].cambio_tema === 't';
      }
    });
  }

  onClick(index) {
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
        sessionStorage.setItem('r', this.sent[index].no_salap);
        const dialog = this.dialog.open(CustomPassComponent);
        dialog.afterClosed().subscribe(() => {
          sessionStorage.removeItem('r');
        });
      } else {
        this.snack.open('Puntos insuficientes', 'OK');
      }
    }
  }

  onCreate() {
    if (this.points >= 5) {
      this.dialog.open(CustomCreateComponent);
    } else {
      this.snack.open('Puntos insuficientes', 'OK');
    }
  }

  arrays() {
    this.languages = [
      {value: 'null', viewValue: this.strings.Topic[0][0]},
      {value: 'es', viewValue: 'Español'},
      {value: 'en', viewValue: 'English'},
      {value: 'fr', viewValue: 'Français'},
      {value: 'de', viewValue: 'Deutsch'},
      {value: 'it', viewValue: 'Italiano'},
      {value: 'pt', viewValue: 'Português'},
      {value: 'ru', viewValue: 'русский'},
      {value: 'zh', viewValue: '中国'},
      {value: 'ja', viewValue: '日本語'},
      {value: 'ko', viewValue: '한국어'}
    ];

    for (const stringsKey in this.strings.Topic[0]) {
      if (stringsKey === '0') {
        this.Temas = [
          {value: 'null', viewValue: this.strings.Topic[0][stringsKey]},
        ];
      } else {
        this.Temas.push(
          {value: spanish.Topic[0][stringsKey], viewValue: this.strings.Topic[0][stringsKey]}
        );
      }
    }
    this.Niveles = [
      {value: 'null', viewValue: this.strings.Topic[0][0]}
    ];
    // tslint:disable-next-line:forin
    for (const stringsKey in this.strings.Level[0]) {
      this.Niveles.push(
        {value: spanish.Level[0][stringsKey], viewValue: this.strings.Level[0][stringsKey]}
      );
    }
    this.Chats = [
      {value: 'null', viewValue: this.strings.Topic[0][0]}
    ];
    // tslint:disable-next-line:forin
    for (const stringsKey in this.strings.Conversation[0]) {
      this.Chats.push(
        {value: spanish.Conversation[0][stringsKey], viewValue: this.strings.Conversation[0][stringsKey]}
      );
    }
  }
}
