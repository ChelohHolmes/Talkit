import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  getUrl = '/Friends.php';

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get('http://localhost:80' + this.getUrl);
    // return this.http.get('https://reqres.in/api/users');
  }
}
