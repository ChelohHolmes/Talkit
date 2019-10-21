import {AfterContentChecked, Component} from '@angular/core';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'Talkit';
  public user = false;

  constructor(private http: UserService) { }

  OnInit() {
    this.onChanges();
  }

  ngAfterContentChecked() {
    this.checkUser();
  }

  checkUser(): void {
    try {
      const user = sessionStorage.getItem('user');
      this.user = user != null;
    } catch (e) {
      console.log('Error');
    }
  }

  private onChanges() {
    this.checkUser();
  }
}
