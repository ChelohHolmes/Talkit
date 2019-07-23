import { Component, OnInit } from '@angular/core';
import {VerifiedService} from '../services/verified.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {
  verified: any;
  private token: string;
  private sent: any;

  constructor(private http: VerifiedService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.email = localStorage.getItem('register');
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
    console.log(this.token);
    this.http.post(this.token).subscribe(data => {
      this.sent = data;
      console.log(this.sent);
      if (this.sent === 0) {
        this.verified = true;
        localStorage.removeItem('register');
      } else {
        this.verified = false;
      }
    });
  }

}
