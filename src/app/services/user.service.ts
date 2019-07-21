import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlSEU = '/ShowEditUser.php';
  private urlEU = '/EditUser.php';
  private urlNP = '/NewPassword.php';
  private urlSEP = '/ShowEditPreferences.php';
  private urlEP = '/EditPreferences.php';

  constructor(private http: HttpClient) { }

  postSEU(form) {
    return this.http.post<any>(environment.serverUrl + this.urlSEU, form);
  }

  postEU(form) {
    return this.http.post<any>(environment.serverUrl + this.urlEU, form);
  }

  postNP(form) {
    return this.http.post<any>(environment.serverUrl + this.urlNP, form);
  }

  postSEP(form) {
    return this.http.post<any>(environment.serverUrl + this.urlSEP, form);
  }

  postEP(form) {
    return this.http.post<any>(environment.serverUrl + this.urlEP, form);
  }
}
