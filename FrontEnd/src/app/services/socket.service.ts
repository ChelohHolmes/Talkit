import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {environment} from '../../environments/environment';
import * as Rx from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }
  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.wsUrl);

    const observable = new Observable(observers => {
      this.socket.on('message', (data) => {
        console.log('Received');
        observers.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: object) => {
        this.socket.emit('message', data);
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
