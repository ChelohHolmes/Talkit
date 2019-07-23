import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = '/login.php';

  constructor(private http: HttpClient) {
  }

  post(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }
}
