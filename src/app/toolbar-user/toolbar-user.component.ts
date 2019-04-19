import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit() {
  }

  onUser() {
  }
}
