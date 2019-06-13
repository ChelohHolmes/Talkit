import { Component, OnInit } from '@angular/core';
import {ILanguage} from '../register/register.component';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

export interface ITable {
  position: number;
  creator: string;
  privacy: string;
  chat: string;
  topic: string;
  language: string;
  participants: number;
  moderator: boolean;
  level: string;
  kicking: boolean;
}

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  languages: ILanguage[] = [
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

  Temas: ILanguage [] = [
    {value: 'Viajes', viewValue: 'Viajes'},
    {value: 'Familia', viewValue: 'Familia'},
    {value: 'Musica', viewValue: 'Musica'}
  ];

  Niveles: ILanguage [] = [
    {value: 'Bajo', viewValue: 'Bajo'},
    {value: 'Medio', viewValue: 'Medio'},
    {value: 'Alto', viewValue: 'Alto'}
  ];

  Chats: ILanguage [] = [
    {value: 'Escrito', viewValue: 'Escrito'},
    {value: 'Oral', viewValue: 'Oral'}
  ];
  Search: FormGroup;
  data: ITable [] = [{
    position: 1,
    creator: 'panchis777',
    privacy: 'Pública',
    chat: 'Oral',
    topic: 'viajes',
    language: 'Español',
    participants: 5,
    moderator: true,
    level: 'Bajo',
    kicking: true
  },
    {
      position: 2,
      creator: 'Alberto',
      privacy: 'Privada',
      chat: 'Escrito',
      topic: 'Familia',
      language: 'Inglés',
      participants: 10,
      moderator: true,
      level: 'Medio',
      kicking: true
    },
    {
      position: 3,
      creator: 'Steve',
      privacy: 'Pública',
      chat: 'Oral',
      topic: 'Música',
      language: 'Italiano',
      participants: 10,
      moderator: false,
      level: 'Avanzado',
      kicking: false
    }
  ];
  displayedColumns: string[] = [
    'position',
    'creator',
    'privacy',
    'chat',
    'topic',
    'language',
    'participants',
    'moderator',
    'level',
    'kicking',
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Search = this.formBuilder.group(   {
    Creator: new FormControl(),
    Topics: new FormControl(),
    Languages: new FormControl(),
    Level: new FormControl(),
    Chats: new FormControl(),
  });
  }

  onSubmit() {
    console.log(this.Search.value);
    const form = JSON.stringify(this.Search.value);
    console.log(form);
  }

}
