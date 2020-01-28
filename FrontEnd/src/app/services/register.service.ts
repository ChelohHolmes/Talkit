import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = '/register.php';
  private urls = '/Verification.php';
  private urlD = '/Delete.php';

  constructor(private http: HttpClient) { }

  post(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }

  posts(form) {
    return this.http.post<any>(environment.serverUrl + this.urls, form);
  }

  postD(form) {
    return this.http.post<any>(environment.serverUrl + this.urlD, form);
  }
}
