import { Component, OnInit } from '@angular/core';

export interface Dispositivos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  selectedE = 'hamanaE-0';
  selectedS = 'hamanaS-0';

  dispositivosE: Dispositivos[] = [
    {value: 'hamanaE-0', viewValue: 'Micrófono Hamana'},
    {value: 'patitoE-1', viewValue: 'Micrófono Patito'}
  ];

  dispositivosS: Dispositivos[] = [
    {value: 'hamanaS-0', viewValue: 'Salida Hamana'},
    {value: 'patitoS-1', viewValue: 'Salida Patito'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
