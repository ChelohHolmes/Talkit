import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import spanish from '../../language/string_es.json';
import english from '../../language/string_en.json';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: any;
  user: string;
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
    this.getData();
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
    this.getData();
  }

  getData() {
    this.http.postRequests(this.user).subscribe(data => {
      this.requests = data;
    });
  }
}
