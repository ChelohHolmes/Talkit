import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/EditUser.php';

  constructor(private http: HttpClient) { }

  post(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }
}
