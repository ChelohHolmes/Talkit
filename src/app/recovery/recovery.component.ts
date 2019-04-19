import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  email: string;
  Recovery: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Recovery = this.formBuilder.group({
      Email: [this.email, [
        Validators.required,
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ]]
    });
  }

  onSubmit() {
    console.log(this.Recovery.value);
    const form = JSON.stringify(this.Recovery.value);
    console.log(form);
  }

}
