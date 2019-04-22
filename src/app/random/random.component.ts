import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {language} from '../register/register.component';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  RandomQueue: FormGroup;
  languages: language[] = [
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
    this.RandomQueue = new FormGroup({
      Type: new FormControl(),
      Language: new FormControl(),
      Rol: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.RandomQueue.value);
    const form = JSON.stringify(this.RandomQueue.value);
    console.log(form);
  }

}
