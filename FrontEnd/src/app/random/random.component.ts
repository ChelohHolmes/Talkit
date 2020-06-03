import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ISelect} from '../register/register.component';
import {RandomService} from '../services/random.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit, OnDestroy {

  RandomQueue: FormGroup;
  languages: ISelect[] = [
    {value: 'es', viewValue: 'Español'},
    {value: 'en', viewValue: 'English'},
    {value: 'fr', viewValue: 'Français'},
    {value: 'de', viewValue: 'Deutsch'},
    {value: 'it', viewValue: 'Italiano'},
    {value: 'pt', viewValue: 'Português'},
    {value: 'ru', viewValue: 'русский'},
    {value: 'zn', viewValue: '中国'},
    {value: 'ja', viewValue: '日本語'},
    {value: 'ko', viewValue: '한국어'}
  ];
  strings: any;
  numUsers: number;
  isMod: boolean;
  seconds = 0;
  interval;
  play: boolean;
  minutes = 0;
  showSeconds: string;
  showMinutes: string;
  user: string;
  searching: boolean;
  constructor(private http: RandomService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.RandomQueue = new FormGroup({
      Type: new FormControl(),
      Language: new FormControl(),
      Rol: new FormControl()
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (sessionStorage.getItem('r')) {
      this.onDestroy();
    }
  }

  onDestroy() {
    clearInterval(this.interval);
    const room = sessionStorage.getItem('r');
    const user = sessionStorage.getItem('user');
    const form = JSON.stringify({user, room});
    this.http.postExit(form).subscribe(data => {
      if (data) {
        sessionStorage.removeItem('destroy');
        sessionStorage.removeItem('r');
      }
    });
  }

  onSubmit() {
    if (!this.play) {
      this.startTimer();
      this.RandomQueue.value.user = sessionStorage.getItem('user');
      const form = JSON.stringify(this.RandomQueue.value);
      this.http.postRandom(form).subscribe(data => {
        if (data) {
          sessionStorage.setItem('r', data);
          sessionStorage.setItem('type', this.RandomQueue.value.Type);
          this.getUsers();
        } else {
          this.snack.open('Error al ingresar', 'OK');
          this.pauseTimer();
        }
      });
    } else {
      this.snack.open('Ya se está buscando una sala', 'OK');
    }
  }

  startTimer() {
    this.play = true;
    this.showSeconds = '00';
    this.showMinutes = '00';
    setTimeout(() => {
      this.searching = true;
    }, 4000);
    setTimeout(() => {
      this.searching = false;
    }, 11000);
    this.interval = setInterval(() => {
      if (this.seconds < 10) {
        this.showSeconds = ('0' + this.seconds);
      } else {
        this.showSeconds = this.seconds.toString();
      }
      if (this.minutes < 10) {
        this.showMinutes = ('0' + this.minutes);
      } else {
        this.showMinutes = this.minutes.toString();
      }
      this.seconds++;
      if (this.seconds > 59) {
        this.seconds = 0;
        this.minutes++;
      }
      if ((this.seconds % 5) === 0) {
        this.getUsers();
        this.checkDestroy();
      }
    }, 1000);
  }

  pauseTimer() {
    const user = sessionStorage.getItem('user');
    const room = sessionStorage.getItem('r');
    const form = JSON.stringify({user, room});
    // console.log(form);
    this.http.postDelete(form).subscribe(data => {
      if (data) {
        this.play = false;
        this.seconds = 0;
        this.minutes = 0;
        clearInterval(this.interval);
        sessionStorage.removeItem('r');
        sessionStorage.removeItem('type');
      } else {
        this.snack.open('Error.', 'OK');
      }
    });
  }

  getUsers() {
    this.http.postUsers(sessionStorage.getItem('r')).subscribe(datap => {
      this.numUsers = 0;
      this.isMod = false;
      if (!datap.users) {
        for (const users of datap) {
          if (!users.mod) {
            this.numUsers++;
          } else {
            this.isMod = true;
          }
        }
      }
      // if (this.isMod && this.numUsers > 4) {
      if (this.isMod && this.numUsers > 1) {
        clearInterval(this.interval);
        this.play = false;
        const md5 = new Md5();
        const lol = md5.appendStr(sessionStorage.getItem('r')).end();
        sessionStorage.setItem('custom', '0');
        sessionStorage.setItem('room', sessionStorage.getItem('r'));
        sessionStorage.removeItem('r');
        this.router.navigate(['/lobby/' + lol]);
      }
    });
  }

  checkDestroy() {
    if (sessionStorage.getItem('destroy')) {
      this.onDestroy();
    }
  }
}
