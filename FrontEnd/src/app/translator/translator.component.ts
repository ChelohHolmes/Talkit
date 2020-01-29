import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ISelect } from '../register/register.component';
import {TranslationService} from '../services/translation.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {

  Translator: FormGroup;
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
  sent: string;

  constructor(private http: TranslationService) {
    this.sent = 'Traducción';
  }

  ngOnInit() {
    this.Translator = new FormGroup({
      Translate: new FormControl(),
      TranslateLanguage: new FormControl(),
      TranslatedLanguage: new FormControl()
    });
  }

  onSubmit() {
    const form = JSON.stringify(this.Translator.value);
    // console.log(form);
    this.http.post(form).subscribe(data => {
      this.sent = data;
      // console.log(this.sent);
    });
  }
}
