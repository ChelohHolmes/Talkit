import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';

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
  selectedE = 'default';
  selectedS = 'default';

  estados: Dispositivos[] = [
    {value: 'Conectado', viewValue: 'Conectado'},
    {value: 'Ocupado', viewValue: 'Ocupado'},
    {value: 'Ausente', viewValue: 'Ausente'},
    {value: 'Desconectado', viewValue: 'Desconectado'}
  ];

  idiomas: Dispositivos[] = [
    {value: 'Inglés', viewValue: 'English'},
    {value: 'Español', viewValue: 'Español'}
  ];

  dispositivosE: Dispositivos[];
  dispositivosS: Dispositivos[];
  config: FormGroup;
  nivel: any;
  estado: any;
  idioma: any;

  constructor(private snackBar: MatSnackBar, private http: UserService) { }

  ngOnInit() {
    this.config = new FormGroup({
      estado: new FormControl(),
      dispE: new FormControl(),
      dispS: new FormControl(),
      idioma: new FormControl(),
      volumen: new FormControl()
    });
    this.http.postSEP(sessionStorage.getItem('user')).subscribe(data => {
      this.nivel = data[0].volumen;
      this.idioma = data[0].idioma;
      this.estado = data[0].estado;
      this.selectedE = data[0].entrada;
      this.selectedS = data[0].salida;
    });
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        devices.forEach(device => {
          if (device.deviceId !== 'communications') {
            if (device.kind === 'audioinput') {
              if (this.dispositivosE === undefined) {
                this.dispositivosE = [
                  {value: device.deviceId, viewValue: device.label}
                ];
              } else {
                this.dispositivosE.push({value: device.deviceId, viewValue: device.label});
              }
            } else if (device.kind === 'audiooutput') {
              if (this.dispositivosS === undefined) {
                this.dispositivosS = [
                  {value: device.deviceId, viewValue: device.label}
                ];
              } else {
                this.dispositivosS.push({value: device.deviceId, viewValue: device.label});
              }
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit() {
    if (this.config.value.volumen === 0 || this.config.value.volumen === null) {
      this.snackBar.open('No puede cambiar su nivel a 0. Escoja otro valor.', 'OK');
    } else {
      this.config.value.user = sessionStorage.getItem('user');
      const form = JSON.stringify(this.config.value);
      // console.log(form);
      this.http.postEP(form).subscribe(data => {
        if (data) {
          this.snackBar.open('Preferencias cambiadas', 'OK');
          this.nivel = this.config.value.volumen;
        } else {
          this.snackBar.open('Error al cambiar preferencias.', 'OK');
        }
      });
    }
  }
}
