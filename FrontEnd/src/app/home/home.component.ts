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
  @ViewChild('audio', {static: true}) audioElement: any;
  audio: any;
  recorder: any;
  interval: any;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private http: ToolbarService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    // this.audio = this.audioElement.nativeElement;
    // navigator.mediaDevices.getUserMedia({ audio: true }).then(async stream => {
    //   // this.audio.srcObject = stream;
    //   // console.log(stream);
    //   // this.ws.emit('message', stream);
    //   // this.ws.on('message', streams => {
    //   //   console.log(streams);
    //   //   this.audio.srcObject = streams;
    //   // });
    //   this.recorder = new RecordRTC.StereoAudioRecorder(stream, {
    //     type: 'audio',
    //     mimeType: 'audio/webm'
    //   });
    //   // for (let times = 0; times < 9; times++) {
    //     // console.log(times);
    //     this.recorder.record();
    //     // setTimeout(() => {
    //     //   console.log('recording');
    //     // }, 5000);
    //     // sleep(5000);
    //     const sleep = m => new Promise(r => setTimeout(r, m));
    //     await sleep(3000);
    //
    //     this.recorder.stop(blob => {
    //       console.log(blob);
    //       // const blob = this.recorder.getBlob();
    //       // this.audio.src = URL.createObjectURL(blob);
    //       this.ws.emit('stream', blob);
    //       this.ws.on('stream', streams => {
    //         console.log(streams);
    //         let hi = new Blob([new Uint8Array(streams)]);
    //         this.audio.src = URL.createObjectURL(hi);
    //         // this.audio.srcObject = blob;
    //         console.log(hi);
    //       });
    //     });
    //   // }
    //   // this.recorder.stop(blob => {
    //   //   console.log(blob);
    //   // });
    //
    // }).catch(error => {
    //   console.log('Error: ' + error);
    // });

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
