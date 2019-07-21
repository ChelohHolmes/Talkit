import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ISelect} from '../register/register.component';
import {Router} from '@angular/router';
import {CustomService} from '../services/custom.service';
import {MatSnackBar} from '@angular/material';

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
  private points: any;

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
  rules: ISelect[] = [
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
  privacy: ISelect[] = [
    {value: 'Publica', viewValue: 'Sala pública'},
    {value: 'Privada', viewValue: 'Sala privada'}
  ];

  constructor(private formBuilder: FormBuilder, private http: CustomService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
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
      // Rules: new FormControl(),
      Description: new FormControl(),
      Privacy: new FormControl(),
    });
    this.participants = this.participantsY;
    this.onChanges();
    this.http.postPoints(sessionStorage.getItem('user')).subscribe(data => {
      this.points = data;
    });
  }

  onChangeTopic() {
    // console.log(this.NewCustom.value.Topic);
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
    window.setTimeout(hamana => {
      that.privacySelected = that.NewCustom.value.Privacy;
    }, 1);
    // console.log(this.NewCustom.valid);
    // console.log(this.NewCustom.value.Password);
  }

  onChanges(): void {
    this.NewCustom.valueChanges.subscribe(() => {
      this.noTopic = false;
      this.noFreeTopic = false;
    });
  }

  onSubmit() {
    console.log(this.NewCustom.value);
    if (this.NewCustom.value.Topic === 'fijo' && this.NewCustom.value.Topics === null) {
      this.noTopic = true;
      this.onChangeTopic();
      // console.log(this.noTopic);
    } else if (this.NewCustom.value.Topic === 'libre' && this.NewCustom.value.FreeTopic === null) {
      this.noFreeTopic = true;
      this.onChangeTopic();
      // console.log(this.noFreeTopic);
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
        // console.log(data);
        if (data) {
          this.router.navigate(['/']);
        } else {
          this.snack.open('Error al crear sala', 'OK');
        }
      });
    }
  }
}
