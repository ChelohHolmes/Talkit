import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslatorComponent} from '../translator/translator.component';
import { MatDialog } from '@angular/material/dialog';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {ToolbarService} from '../services/toolbar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import * as wss from 'socket.io-stream';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened: boolean;
  bNews: boolean;
  bRandom: boolean;
  bCustom: boolean;
  strings: any;
  searching: boolean;
  pc: any;
  // @ViewChild('audio') audioElement: any;
  audio: any;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private http: ToolbarService, private route: ActivatedRoute, private ws: Socket) { }

  ngOnInit() {
    // this.audio = this.audioElement.nativeElement;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // this.audio.srcObject = stream;
      console.log(stream);
      this.ws.emit('message', stream);
      this.ws.on('message', streams => {
        console.log(streams);
        // this.audio.srcObject = streams;
      });
    }).catch(error => {
      console.log('Error: ' + error);
    });

    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    let i;
    this.route.queryParams.subscribe(params => {
      i = params.i;
    });
    if (i) {
      this.onRandom();
    } else {
      this.bNews = true;
      this.bRandom = false;
      this.bCustom = false;
    }
    this.change();
    setInterval(() => {
      this.change();
    }, 5000);
  }

  onRandom() {
    this.bNews = false;
    this.bRandom = true;
    this.bCustom = false;
  }

  onCustom() {
    this.bNews = false;
    this.bRandom = false;
    this.bCustom = true;
  }

  onTranslator() {
    this.dialog.open(TranslatorComponent);
  }

  exit() {
    const dialog = this.dialog.open(ConfirmationComponent);
    dialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        sessionStorage.setItem('destroy', '1');
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('custom');
        this.searching = false;
        this.onCustom();
      }
    });
  }

  change() {
    this.searching = sessionStorage.getItem('r') !== null;
  }
}
