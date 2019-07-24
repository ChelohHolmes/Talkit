import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private urlAddFriends = '/AddFriends.php';
  private urlShowFriends = '/FriendShow.php';
  private urlAccept = '/FriendAccept.php';
  private urlNoAccept = '/FriendNoAccept.php';
  private urlRequests = '/FriendRequests.php';
  private urlBlocked = '/FriendBlocked.php';
  private urlUnblock = '/FriendUnblock.php';
  private urlBlock = '/FriendBlock.php';
  private urlRemove = '/FriendRemove.php';
  private urlChat = '/FriendChat.php';

  constructor(private http: HttpClient) { }

  postAddFriends(form) {
    return this.http.post<any>(environment.serverUrl + this.urlAddFriends, form);
  }

  postShowFriends(form) {
    return this.http.post<any>(environment.serverUrl + this.urlShowFriends, form);
  }

  postAccept(form) {
    return this.http.post<any>(environment.serverUrl + this.urlAccept, form);
  }

  postNoAccept(form) {
    return this.http.post<any>(environment.serverUrl + this.urlNoAccept, form);
  }

  postRequests(form) {
    return this.http.post<any>(environment.serverUrl + this.urlRequests, form);
  }

  postBlocked(form) {
    return this.http.post<any>(environment.serverUrl + this.urlBlocked, form);
  }

  postUnblock(form) {
    return this.http.post<any>(environment.serverUrl + this.urlUnblock, form);
  }

  postBlock(form) {
    return this.http.post<any>(environment.serverUrl + this.urlBlock, form);
  }

  postRemove(form) {
    return this.http.post<any>(environment.serverUrl + this.urlRemove, form);
  }

  postChat(form) {
    return this.http.post<any>(environment.serverUrl + this.urlChat, form);
  }
}
