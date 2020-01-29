import {Component, OnInit} from '@angular/core';
import {ISelect} from '../register/register.component';
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
  private info: any;
  NewInfo: FormGroup;
  email: string;
  password: string;
  hide = true;
  defName: string;
  defLastName: string;
  defEmail: string;
  defLanguage: string;
  defGender: string;
  defDescription: string;
  selectedFile: any;
  private picture: any;

  constructor(private formBuilder: FormBuilder, private http: UserService) { }

  languages: ISelect[] = [
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

  genders: ISelect[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
    {value: 'No binario', viewValue: 'No binario'}
  ];

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
      LastName: new FormControl(),
      Gender: new FormControl(),
      NativeLanguage: new FormControl(),
      Description: new FormControl()
    });
    this.onChanges();
    this.http.postSEU(sessionStorage.getItem('user')).subscribe(data => {
      this.info = data;
      this.defName = this.info[0].nombres;
      this.defLastName = this.info[0].apellidos;
      this.defEmail = this.info[0].correo;
      this.defLanguage = this.info[0].lengua_mater;
      this.defGender = this.info[0].sexo;
      this.defDescription = this.info[0].intereses;
      this.picture = this.info[0].foto_perfil;
    });
  }

  onSubmit() {
    this.NewInfo.value.User = sessionStorage.getItem('user');
    const form = JSON.stringify(this.NewInfo.value);
    console.log(form);
    this.http.postEU(form).subscribe(data => {
      this.sent = data;
      if (this.sent === 1) {
        this.incorrect = true;
      } else {
        this.correct = true;
      }
    });
  }

  onFileChanged(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.selectedFile = reader.result;
      const user = sessionStorage.getItem('user');
      const file = this.selectedFile;
      const form = JSON.stringify({user, file});
      console.log(form);
      this.http.postImage(form).subscribe(data => {
        if (data) {
          this.picture = this.selectedFile;
        }
      });
    };
  }

  onChanges(): void {
    this.NewInfo.valueChanges.subscribe(() => {
      this.incorrect = false;
    });
  }
}
