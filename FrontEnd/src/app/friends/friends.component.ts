import { Component, OnInit } from '@angular/core';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  bAdded: boolean;
  bRequests: boolean;
  bBlocked: boolean;
  strings: any;
  user: string;

  constructor() {
  }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.user = sessionStorage.getItem('user');
    this.bAdded = true;
    this.bRequests = false;
    this.bBlocked = false;
  }

  onAdded() {
    this.bAdded = true;
    this.bRequests = false;
    this.bBlocked = false;
  }

  onRequests() {
    this.bAdded = false;
    this.bRequests = true;
    this.bBlocked = false;
  }

  onBlocked() {
    this.bAdded = false;
    this.bRequests = false;
    this.bBlocked = true;
  }
}
