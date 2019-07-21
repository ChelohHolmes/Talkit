import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  bAdded: boolean;
  bRequests: boolean;
  bBlocked: boolean;

  constructor() {
  }

  ngOnInit() {
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
