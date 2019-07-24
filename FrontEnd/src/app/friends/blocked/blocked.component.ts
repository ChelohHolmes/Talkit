import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  private blocked: any;
  private user: string;

  constructor(private http: FriendsService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    this.http.postBlocked(this.user).subscribe(data => {
      this.blocked = data;
      // console.log(this.blocked);
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
