import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private url = '/AddFriends.php';
  private urls = '/Friends.php';
  private urlA = '/FriendA.php';
  private urlN = '/FriendN.php';
  private urlR = '/FriendR.php';
  private urlB = '/FriendB.php';
  private urlU = '/FriendU.php';
  private urlBK = '/FriendBK.php';
  private urlRE = '/FriendRE.php';

  constructor(private http: HttpClient) { }

  post(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }

  posts(form) {
    return this.http.post<any>(environment.serverUrl + this.urls, form);
  }

  postA(form) {
    return this.http.post<any>(environment.serverUrl + this.urlA, form);
  }

  postN(form) {
    return this.http.post<any>(environment.serverUrl + this.urlN, form);
  }

  postR(form) {
    return this.http.post<any>(environment.serverUrl + this.urlR, form);
  }

  postB(form) {
    return this.http.post<any>(environment.serverUrl + this.urlB, form);
  }

  postU(form) {
    return this.http.post<any>(environment.serverUrl + this.urlU, form);
  }

  postBK(form) {
    return this.http.post<any>(environment.serverUrl + this.urlBK, form);
  }

  postRE(form) {
    return this.http.post<any>(environment.serverUrl + this.urlRE, form);
  }
}
