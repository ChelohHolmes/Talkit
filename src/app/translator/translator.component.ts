import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ILanguage } from '../register/register.component';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {

  Translator: FormGroup;
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

  constructor() { }

  ngOnInit() {
    this.Translator = new FormGroup({
      Translate: new FormControl(),
      TranslateLanguage: new FormControl(),
      TranslatedLanguage: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.Translator.value);
    const form = JSON.stringify(this.Translator.value);
    console.log(form);
  }
}
