import { Component, OnInit } from '@angular/core';
import {FriendsService} from '../services/friends.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  users: any;
  hamana: any;
  hamana2: any;
  hamana3: any;
  hamana4: any;
  hamana5: any;
  hamana6: any;
  addFriend: FormGroup;
  searchFriend: FormGroup;

  constructor(private data: FriendsService) {
  }

  ngOnInit() {
    this.data.getFriends().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });

    this.hamana = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/567867231673778191/29366025_914311878736899_3528699401876799488_o.png',
      name: 'Azul',
    };

    this.hamana2 = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/569308540297019456/SaKC9zDvPfqyJd1O59RwuB80JESThrE4Twk8PhIiChS-niRag_w4YLPx_d9z7-qAHyWNlZF_QQfya6NgZEA6QoObfCpNb2QLGxVC.png',
      name: 'Héctor',
    };

    this.hamana3 = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/569309413136007189/56242562_2689868477751531_1023050309280202752_o.png',
      name: 'Citlalli',
    };

    this.hamana4 = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/569354934223372288/Carli.jpg',
      name: 'Carlo',
    };

    this.hamana5 = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/569354962732187648/Daryl_Hall.jpg',
      name: 'Daryl',
    };

    this.hamana6 = {
      avatar: 'https://cdn.discordapp.com/attachments/304829873468342283/569355075240067102/ngbbs5695ea7e76bcb.jpg',
      name: 'Katya',
    };

    this.addFriend = new FormGroup({
      user: new FormControl()
    });

    this.searchFriend = new FormGroup({
      friend: new FormControl()
    });
  }

  onSubmitAddFriend() {
    const form = JSON.stringify(this.addFriend.value);
    console.log(form);
  }
}
