import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ISelect} from '../register/register.component';
import {RandomService} from '../services/random.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  RandomQueue: FormGroup;
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
  constructor(private http: RandomService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.RandomQueue = new FormGroup({
      Type: new FormControl(),
      Language: new FormControl(),
      Rol: new FormControl()
    });
  }

  onSubmit() {
    // console.log(this.RandomQueue.value);
    this.RandomQueue.value.user = sessionStorage.getItem('user');
    const form = JSON.stringify(this.RandomQueue.value);
    // console.log(form);
    this.http.postRandom(form).subscribe(data => {
      // console.log(data);
      if (data) {
        this.router.navigate(['/']);
      } else {
        this.snack.open('Error al ingresar', 'OK');
      }
    });
  }
}
