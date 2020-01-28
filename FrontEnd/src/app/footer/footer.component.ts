import { Component, OnInit } from '@angular/core';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  strings: any;

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
  }

}
