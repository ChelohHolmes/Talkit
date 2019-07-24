import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  private requests: any;
  private user: string;

  constructor(private http: FriendsService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    this.http.postRequests(this.user).subscribe(data => {
      this.requests = data;
    });
  }

  Accept(id) {
    const form = JSON.stringify({user: this.user, id} );
    // console.log(form);
    this.http.postAccept(form).subscribe(data => {
      if (data) {
        this.snack.open('Usuario aceptado', 'OK');
      } else {
        this.snack.open('Error al aceptar', 'OK');
      }
    });
  }

  No(id) {
    const form = JSON.stringify({user: this.user, id} );
    this.http.postNoAccept(form).subscribe(data => {
      if (data) {
        this.snack.open('Solicitud rechazada', 'OK');
      } else {
        this.snack.open('Error al rechazar', 'OK');
      }
    });
  }

}
