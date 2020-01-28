import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material';
import spanish from '../../language/string_es.json';
import english from '../../language/string_en.json';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  private blocked: any;
  private user: string;
  strings: any;

  constructor(private http: FriendsService, private snack: MatSnackBar) { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.user = sessionStorage.getItem('user');
    if (this.user) {
      this.getData();
    }
  }

  getData() {
    this.http.postBlocked(this.user).subscribe(data => {
      this.blocked = data;
    });
  }

  Unblock(id) {
    const form = JSON.stringify({user: this.user, id} );
    // console.log(form);
    this.http.postUnblock(form).subscribe(data => {
      if (data) {
        this.snack.open('Usuario desbloqueado', 'OK');
      } else {
        this.snack.open('Error al desbloquear', 'OK');
      }
    });
  }
}
