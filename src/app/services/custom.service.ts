import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  private url = '/ShowPrivateRooms.php';
  private urlJoin = '/CustomJoin.php';
  private urlPass = '/CustomPass.php';
  private urlFilter = '/CustomFilter.php';
  private urlPoints = '/ShowPoints.php';
  private urlCreate = '/CustomCreate.php';

  constructor(private http: HttpClient) { }

  post() {
    return this.http.post<any>(environment.serverUrl + this.url, null);
  }

  postJoin(form) {
    return this.http.post<any>(environment.serverUrl + this.urlJoin, form);
  }

  postPass(form) {
    return this.http.post<any>(environment.serverUrl + this.urlPass, form);
  }

  postFilter(form) {
    return this.http.post<any>(environment.serverUrl + this.urlFilter, form);
  }

  postPoints(form) {
    return this.http.post<any>(environment.serverUrl + this.urlPoints, form);
  }

  postCreate(form) {
    return this.http.post<any>(environment.serverUrl + this.urlCreate, form);
  }
}
