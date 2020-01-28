import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Subject<any>;

  constructor(private wsService: SocketService) {
    this.messages = wsService
      .connect().pipe(
      map((response: any): any => {
        return response;
      })) as Subject<any>;
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  recieveMsg() {
  }
}
