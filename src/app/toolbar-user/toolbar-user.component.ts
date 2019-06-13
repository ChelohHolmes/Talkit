import { Component, OnInit } from '@angular/core';
import {PointsService} from '../services/points.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {
  user: any;
  points: any;

  constructor(private http: PointsService, private router: Router) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    // console.log(this.user);
    this.http.post(this.user).subscribe(data => {
      this.points = data;
      // console.log(this.points);
    });
  }

  onCS() {
    this.router.navigate(['/']);
    sessionStorage.removeItem('user');
  }
}
