import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FriendsService} from '../services/friends.service';
import * as PeerS from 'simple-peer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: any;
  friends: any;
  id: any;
  yours: any;
  localConnection: RTCPeerConnection;
  remoteConnection: RTCPeerConnection;
  localChannel: RTCDataChannel;
  connected: boolean;
  onLocalMessageReceived: any;
  onRemoteDataChannel: any;
  localMessages: string;
  remoteMessages: string;
  messages: any;
  message: string;
  Message: FormGroup;


  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private http: FriendsService, private formBuilder: FormBuilder, private socket: Socket, private snack: MatSnackBar) { }

  ngOnInit() {
    this.messages = [];
    this.message = '';
    this.Message = this.formBuilder.group({Message: this.message});
    this.connected = false;
    this.localMessages = '';
    this.remoteMessages = '';
    // PeerS.on('signal', data => {
    //   this.yours = data;
    //   this.route.queryParams.subscribe(params => {
    //     this.user = sessionStorage.getItem('user');
    //     this.id = params.i;
    //   });
    this.user = sessionStorage.getItem('user');
    const id = sessionStorage.getItem('id');
    sessionStorage.removeItem('id');
    if (id) {
      const form = JSON.stringify({user: this.user, friendId: id});
      this.http.postChat(form).subscribe(dataFriends => {
        this.friends = dataFriends;
      });
    } else {
      this.snack.open('Intenta despues, pues', 'OK');
    }
    // });
    // const forms = JSON.stringify({user: this.user, idR: this.friends[0].id_usuario_recibe});
    // this.http.postId(forms).subscribe(data => {
    //   console.log(data);
    // });
    // this.localConnection = new RTCPeerConnection();
    // console.log(this.localConnection);
    this.checkMessages();
  }

  // disconnect() {
  //   this.localConnection.close();
  //   this.remoteConnection.close();
  // }
  //
  // async connect() {
  //   try {
  //     const dataChannelParams = {ordered: true};
  //     this.localConnection = new RTCPeerConnection();
  //     this.localConnection.addEventListener('icecandidate', async e => {
  //       console.log('local connection ICE candidate: ', e.candidate);
  //       await this.remoteConnection.addIceCandidate(e.candidate);
  //     });
  //     this.remoteConnection = new RTCPeerConnection();
  //     this.remoteConnection.addEventListener('icecandidate', async e => {
  //       console.log('remote connection ICE candidate: ', e.candidate);
  //       await this.localConnection.addIceCandidate(e.candidate);
  //     });
  //     this.localChannel = this.localConnection
  //       .createDataChannel('messaging-channel', dataChannelParams);
  //     this.localChannel.binaryType = 'arraybuffer';
  //     this.localChannel.addEventListener('open', () => {
  //       console.log('Local channel open!');
  //       this.connected = true;
  //     });
  //     this.localChannel.addEventListener('close', () => {
  //       console.log('Local channel closed!');
  //       this.connected = false;
  //     });
  //     this.localChannel.addEventListener('message', this.onLocalMessageReceived.bind(this));
  //     this.remoteConnection.addEventListener('datachannel', this.onRemoteDataChannel.bind(this));
  //
  //     const initLocalOffer = async () => {
  //       const localOffer = await this.localConnection.createOffer();
  //       console.log(`Got local offer ${JSON.stringify(localOffer)}`);
  //       const localDesc = this.localConnection.setLocalDescription(localOffer);
  //       const remoteDesc = this.remoteConnection.setRemoteDescription(localOffer);
  //       return Promise.all([localDesc, remoteDesc]);
  //     };
  //
  //     const initRemoteAnswer = async () => {
  //       const remoteAnswer = await this.remoteConnection.createAnswer();
  //       console.log(`Got remote answer ${JSON.stringify(remoteAnswer)}`);
  //       const localDesc = this.remoteConnection.setLocalDescription(remoteAnswer);
  //       const remoteDesc = this.localConnection.setRemoteDescription(remoteAnswer);
  //       return Promise.all([localDesc, remoteDesc]);
  //     };
  //     await initLocalOffer();
  //     await initRemoteAnswer();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // _onRemoteMessageReceived(event) {
  //   console.log(`Local message received by remote: ${event.data}`);
  //   this.remoteMessages += event.data + '\n';
  // }
  //
  // static get properties() {
  //   return {
  //     connected: {type: Boolean},
  //     localMessages: {type: String},
  //     remoteMessages: {type: String}
  //   };
  // }
  //
  // sendMessage(selector, channel) {
  //   const textarea = this.shadowRoot.querySelector(selector);
  //   const value = textarea.value;
  //   if (value === '') {
  //     console.log('Not sending empty message!');
  //     return;
  //   }
  //   console.log('Sending remote message: ', value);
  //   channel.send(value);
  //   textarea.value = '';
  // }

  sendMessage() {
    this.socket.emit('message', {user: this.user, message: this.message});
    this.message = '';
  }

  checkMessages() {
    this.socket.on('message', data => {
      this.messages.push(data);
    });
  }
}
