import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-added',
  templateUrl: './added.component.html',
  styleUrls: ['./added.component.scss']
})
export class AddedComponent implements OnInit {

  addFriend: FormGroup;
  searchFriend: FormGroup;
  private sent: any;
  private friends: any;
  private user: string;

  constructor(private http: FriendsService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    // console.log(user);
    this.http.posts(this.user).subscribe(data => {
      this.friends = data;
      console.log(this.friends);
    });

    this.addFriend = new FormGroup({
      username: new FormControl()
    });

    this.searchFriend = new FormGroup({
      friend: new FormControl()
    });
  }

  onSubmitAddFriend() {
    this.addFriend.value.user = sessionStorage.getItem('user');
    const form = JSON.stringify(this.addFriend.value);
    console.log(form);
    this.http.post(form).subscribe(data => {
      this.sent = data;
      console.log(this.sent);
      if (this.sent === 0) {
        this.snack.open('Error al mandar la solicitud.', 'OK');
      } else {
        this.snack.open('Se mandó correctamente la solicitud.', 'OK');
      }
    });
  }

  clear(input: HTMLInputElement) {
    input.value = '';
  }

  Block(id) {
    const form = JSON.stringify({user: this.user, id} );
    // console.log(form);
    this.http.postBK(form).subscribe(data => {
      if (data) {
        this.snack.open('Usuario bloqueado', 'OK');
      } else {
        this.snack.open('Error al bloquear', 'OK');
      }
    });
  }

  Remove(id) {
    const form = JSON.stringify({user: this.user, id} );
    // console.log(form);
    this.http.postRE(form).subscribe(data => {
      if (data) {
        this.snack.open('Usuario eliminado', 'OK');
      } else {
        this.snack.open('Error al eliminar', 'OK');
      }
    });
  }

  Message(index) {
    // console.log(index);
    const id = Md5.hashStr(this.friends[index].id_usuario_recibe);
    window.open('http://localhost:4200/chat?i=' + id);
  }
}
