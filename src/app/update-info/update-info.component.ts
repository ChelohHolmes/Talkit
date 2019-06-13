import {Component, OnInit} from '@angular/core';
import {IGender, ILanguage} from '../register/register.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  private sent: any;
  private incorrect: boolean;
  private correct: boolean;

  constructor(private formBuilder: FormBuilder, private http: UserService) { }
  NewInfo: FormGroup;
  email: string;
  password: string;
  hide = true;

  languages: ILanguage[] = [
    {value: 'Español', viewValue: 'Español'},
    {value: 'Inglés', viewValue: 'English'},
    {value: 'Francés', viewValue: 'Français'},
    {value: 'Alemán', viewValue: 'Deutsch'},
    {value: 'Italiano', viewValue: 'Italiano'},
    {value: 'Portugués', viewValue: 'Português'},
    {value: 'Ruso', viewValue: 'русский'},
    {value: 'Chino', viewValue: '中国'},
    {value: 'Japonés', viewValue: '日本語'},
    {value: 'Coreano', viewValue: '한국어'}
  ];

  genders: IGender[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'No binario', viewValue: 'No binario'}
  ];

  selectedFile: File;
  updateemail: any;

  ngOnInit() {
    this.NewInfo = this.formBuilder.group({
      Email: [this.email, [
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      ]],
      Password: [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
      ]],
      Name: new FormControl(),
      Lastname: new FormControl(),
      Gender: new FormControl(),
      NativeLanguage: new FormControl(),
      Description: new FormControl()
    });
    this.onChanges();
  }

  onSubmit() {
    this.NewInfo.value.User = sessionStorage.getItem('user');
    const form = JSON.stringify(this.NewInfo.value);
    this.http.post(form).subscribe(data => {
      this.sent = data;
      console.log(this.sent);
      if (this.sent === 1) {
        this.incorrect = true;
      } else {
        this.correct = true;
        console.log(this.sent);
      }
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onChanges(): void {
    this.NewInfo.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }
}
