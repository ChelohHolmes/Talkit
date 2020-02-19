import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ISelect} from '../register/register.component';
import {Router} from '@angular/router';
import {CustomService} from '../services/custom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-custom-create',
  templateUrl: './custom-create.component.html',
  styleUrls: ['./custom-create.component.scss']
})
export class CustomCreateComponent implements OnInit {
  NewCustom: FormGroup;
  hide = true;
  password: string;
  topicSelected: string;
  moderatorSelected: string;
  privacySelected = 'Privada';
  noTopic: boolean;
  noFreeTopic: boolean;
  errorParticipants: boolean;
  points: any;
  strings: any;

  types: ISelect[] = [
    {value: 'fijo', viewValue: 'Tema fijo'},
    {value: 'aleatorio', viewValue: 'Temas aleatorios'},
    {value: 'libre', viewValue: 'Tema libre'}
  ];
  topics: ISelect[] = [
    {value: 'Viajes', viewValue: 'Viajes'},
    {value: 'Familia', viewValue: 'Familia'},
    {value: 'Experiencias', viewValue: 'Experiencias'},
    {value: 'Costumbres', viewValue: 'Costumbres'},
    {value: 'Educación', viewValue: 'Educación'},
    {value: 'Tradciones', viewValue: 'Tradiciones'}
  ];
  chatTypes: ISelect[] = [
    {value: 'Oral', viewValue: 'Oral'},
    {value: 'Escrita', viewValue: 'Escrito'}
  ];
  moderator: ISelect[] = [
    {value: 'true', viewValue: 'Habilitar moderador'},
    {value: 'false', viewValue: 'Sala libre'}
  ];
  languages: ISelect[] = [
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
  participants = [];
  participantsY = [
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'}
  ];
  participantsN = [
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'}
  ];
  levels: ISelect[] = [
    {value: 'Basico', viewValue: 'Básico'},
    {value: 'Intermedio', viewValue: 'Intermedio'},
    {value: 'Avanzado', viewValue: 'Avanzado'}
  ];
  rules = [];
  privacy: ISelect[] = [
    {value: 'Publica', viewValue: 'Sala pública'},
    {value: 'Privada', viewValue: 'Sala privada'}
  ];
  join: ISelect[] = [
    {value: 'Participante', viewValue: 'as participant'},
    {value: 'Moderador', viewValue: 'as moderator'}
  ];
  chooseRules = [
    {value: false, viewValue: 'No rules'},
    {value: true, viewValue: 'Choose rules'}
  ];
  startRules: any;
  wantRules: any;
  private RulesGroup: FormControl;

  constructor(private formBuilder: FormBuilder, private http: CustomService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    // this.wantRules = false;
    this.rules = [
      {value: 1, viewValue: this.strings.Rules[0][1]},
      {value: 2, viewValue: this.strings.Rules[0][2]},
      {value: 3, viewValue: this.strings.Rules[0][3]},
      {value: 4, viewValue: this.strings.Rules[0][4]},
      {value: 5, viewValue: this.strings.Rules[0][5]},
      {value: 6, viewValue: this.strings.Rules[0][6]},
      {value: 7, viewValue: this.strings.Rules[0][7]},
      {value: 8, viewValue: this.strings.Rules[0][8]},
      {value: 9, viewValue: this.strings.Rules[0][9]},
      {value: 10, viewValue: this.strings.Rules[0][10]}
    ];
    this.NewCustom = this.formBuilder.group({
      Password: [this.password, [
        Validators.required,
        Validators.minLength(4),
      ]],
      Topic: new FormControl(),
      Topics: new FormControl(),
      FreeTopic: new FormControl(),
      ChatType: new FormControl(),
      Moderator: new FormControl(),
      Language: new FormControl(),
      Participants: new FormControl(),
      Level: new FormControl(),
      HasRules: new FormControl(),
      Description: new FormControl(),
      Privacy: new FormControl(),
      Join: new FormControl(),
    });
    // this.RulesGroup = new FormControl(this.formBuilder.group({
    //   rules: this.formBuilder.array([])
    // }));
    // const formArray = this.RulesGroup.get('rules') as FormArray;
    // this.rules.forEach(x => formArray.push(new FormControl(false)));
    this.participants = this.participantsY;
    this.onChanges();
    this.http.postPoints(sessionStorage.getItem('user')).subscribe(data => {
      this.points = data;
    });
  }

  onChangeTopic() {
    this.topicSelected = this.NewCustom.value.Topic;
  }

  onChangeType() {
    this.moderatorSelected = this.NewCustom.value.Moderator;
    if (this.moderatorSelected === 'false') {
      this.participants = this.participantsN;
    } else {
      this.participants = this.participantsY;
    }
  }

  onChangePrivacy() {
    if (this.NewCustom.value.Privacy === 'Publica') {
      this.password = '1234';
    } else {
      this.password = '';
    }
    const that = this;
    window.setTimeout(() => {
      that.privacySelected = that.NewCustom.value.Privacy;
    }, 1);
  }

  onChanges(): void {
    this.NewCustom.valueChanges.subscribe(() => {
      this.noTopic = false;
      this.noFreeTopic = false;
    });
  }

  onSubmit() {
    if (this.NewCustom.value.Topic === 'fijo' && this.NewCustom.value.Topics === null) {
      this.noTopic = true;
      this.onChangeTopic();
    } else if (this.NewCustom.value.Topic === 'libre' && this.NewCustom.value.FreeTopic === null) {
      this.noFreeTopic = true;
      this.onChangeTopic();
    } else if (this.NewCustom.value.Moderator === 'false' && this.NewCustom.value.Participants === 11) {
      this.errorParticipants = true;
      this.onChangeType();
    } else if ((this.NewCustom.value.Privacy === 'Publica' && this.points < 5)
      || (this.NewCustom.value.Privacy === 'Privada' && this.points < 10)) {
      this.snack.open('Puntos insuficientes. Privada: 10. Publica: 5', 'OK');
    } else {
      this.NewCustom.value.user = sessionStorage.getItem('user');
      const form = JSON.stringify(this.NewCustom.value);
      this.http.postCreate(form).subscribe(data => {
        if (data) {
          sessionStorage.setItem('type', this.NewCustom.value.ChatType);
          sessionStorage.setItem('room', data);
          sessionStorage.setItem('creator', '1');
          sessionStorage.setItem('custom', '0');
          const md5 = new Md5();
          const lol = md5.appendStr(data).end();
          this.router.navigate(['/lobby/' + lol]);
        } else {
          this.snack.open('Error al crear sala', 'OK');
        }
      });
    }
  }
}
