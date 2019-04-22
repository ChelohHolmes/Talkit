import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  bAudio: boolean;
  bInfo: boolean;
  bPass: boolean;

  constructor() { }

  ngOnInit() {
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
