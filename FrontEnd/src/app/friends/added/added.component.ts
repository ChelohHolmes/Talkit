import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material';
import {Md5} from 'ts-md5';
import spanish from '../../language/string_es.json';
import english from '../../language/string_en.json';

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
  strings: any;

  constructor(private http: FriendsService, private snack: MatSnackBar) { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.user = sessionStorage.getItem('user');
    // console.log(user);
    if (this.user) {
      this.getData();
    }

    this.addFriend = new FormGroup({
      username: new FormControl()
    });

    this.searchFriend = new FormGroup({
      friend: new FormControl()
    });
  }

  getData() {
    this.http.postShowFriends(this.user).subscribe(data => {
      this.friends = data;
    });
  }

  onSubmitAddFriend() {
    this.addFriend.value.user = sessionStorage.getItem('user');
    const form = JSON.stringify(this.addFriend.value);
    console.log(form);
    this.http.postAddFriends(form).subscribe(data => {
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
    this.http.postBlock(form).subscribe(data => {
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
    this.http.postRemove(form).subscribe(data => {
      if (data) {
        this.snack.open('Usuario eliminado', 'OK');
      } else {
        this.snack.open('Error al eliminar', 'OK');
      }
    });
  }

  Message(index) {
    // console.log(index);
    const id1 = +this.friends[index].id_usuario_recibe;
    const id2 = +this.friends[index].id_usuario_envia;
    const idER = id1 + id2;
    const ids = idER.toString();
    const id = Md5.hashStr(ids);
    sessionStorage.setItem('id', this.friends[index].id_usuario_recibe);
    window.open('http://localhost:4200/chat?i=' + id);
  }
}
