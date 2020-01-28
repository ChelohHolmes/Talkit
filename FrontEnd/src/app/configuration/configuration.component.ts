import { Component, OnInit } from '@angular/core';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  bAudio: boolean;
  bInfo: boolean;
  bPass: boolean;
  strings: any;

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
    this.bAudio = true;
    this.bInfo = false;
    this.bPass = false;
  }

  onAudio() {
    this.bAudio = true;
    this.bInfo = false;
    this.bPass = false;
  }

  onInfo() {
    this.bAudio = false;
    this.bInfo = true;
    this.bPass = false;
  }

  onPass() {
    this.bAudio = false;
    this.bInfo = false;
    this.bPass = true;
  }

}
