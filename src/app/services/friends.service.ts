import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  getUrl = '/Friends.php';

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get(environment.serverUrl + this.getUrl);
    // return this.http.get('https://reqres.in/api/users');
  }
}
