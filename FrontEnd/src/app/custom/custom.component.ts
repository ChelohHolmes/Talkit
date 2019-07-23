import { Component, OnInit } from '@angular/core';
import {ISelect} from '../register/register.component';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {CustomService} from '../services/custom.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomPassComponent} from '../custom-pass/custom-pass.component';
import {Router} from '@angular/router';
import {CustomCreateComponent} from '../custom-create/custom-create.component';

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

  languages: ISelect[] = [
    {value: 'null', viewValue: 'Cualquiera'},
    {value: 'Español', viewValue: 'Español'},
    {value: 'Inglés', viewValue: 'English'},
    {value: 'Francés', viewValue: 'Français'},
    {value: 'Alemán', viewValue: 'Deutsch'},
    {value: 'Italiano', viewValue: 'Italiano'},
    {value: 'Portugués', viewValue: 'Português'},
    {value: 'Ruso', viewValue: 'русский'},
    {value: 'Chino', viewValue: '中国'},
    {value: 'Japonés', viewValue: '日本語'},
    {value: 'Coreano', viewValue: '한국어'}
  ];

  Temas: ISelect [] = [
    {value: 'null', viewValue: 'Cualquiera'},
    {value: 'Viajes', viewValue: 'Viajes'},
    {value: 'Familia', viewValue: 'Familia'},
    {value: 'Musica', viewValue: 'Musica'}
  ];

  Niveles: ISelect [] = [
    {value: 'null', viewValue: 'Cualquiera'},
    {value: 'Basico', viewValue: 'Básico'},
    {value: 'Intermedio', viewValue: 'Intermedio'},
    {value: 'Avanzado', viewValue: 'Avanzado'}
  ];

  Chats: ISelect [] = [
    {value: 'null', viewValue: 'Cualquiera'},
    {value: 'Escrita', viewValue: 'Escrita'},
    {value: 'Oral', viewValue: 'Oral'}
  ];

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
  private sent: any;
  moderator = [];
  changeSubject = [];
  size: number;
  private points: any;

  constructor(private formBuilder: FormBuilder,
              private http: CustomService,
              private dialog: MatDialog,
              private router: Router,
              private snack: MatSnackBar) { }

  ngOnInit() {
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
        this.moderator[i] = this.sent[i].moderador === 't';
        this.changeSubject[i] = this.sent[i].cambio_tema === 't';
      }
    });
    this.http.postPoints(sessionStorage.getItem('user')).subscribe(data => {
      this.points = data;
      console.log(this.points);
    });
    console.log('r: ' + sessionStorage.getItem('r'));
  }

  onSubmit() {
    const form = JSON.stringify(this.Search.value);
    // console.log(form);
    this.http.postFilter(form).subscribe(data => {
      // console.log(data);
      this.sent = data;
      this.size = this.sent.length;
      for (let i = 0; i < this.size; i++) {
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
        this.dialog.open(CustomPassComponent);
      } else {
        this.snack.open('Puntos insuficientes', 'OK');
      }
    } else {
      if (this.points >= 1) {
        const form = JSON.stringify({user: sessionStorage.getItem('user'), room: this.sent[index].no_salap} );
        console.log(form);
        this.http.postJoin(form).subscribe(data => {
          if (data === 1) {
            this.router.navigate(['/']);
          } else {
            this.snack.open('Hubo un problema al entrar.', 'OK');
          }
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
}
