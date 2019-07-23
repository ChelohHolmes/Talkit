import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FriendsService} from '../services/friends.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private user: any;
  private friends: any;
  private id: any;

  constructor(private route: ActivatedRoute, private http: FriendsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = sessionStorage.getItem('user');
      this.id = params.i;
    });
    const form = JSON.stringify({u: this.user, i: this.id});
    this.http.postC(form).subscribe(data => {
      this.friends = data;
      console.log(this.friends);
    });
  }

}
