import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import spanish from '../language/string_es.json';
import english from '../language/string_en.json';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  private strings: any;

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>) { }

  ngOnInit() {
    if (localStorage.getItem('lan') === 'es') {
      this.strings = spanish;
    } else {
      this.strings = english;
    }
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
