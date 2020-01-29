import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  private url = '/RandomQueue.php';
  private urls = '/RandomData.php';
  private urlps = '/RandomDelete.php';
  private urlp = '/GivePoints.php';
  private urlExit = '/RandomDelete.php';
  private urlAddKick = '/AddKick.php';
  private urlCheck = '/CheckPreferences.php';
  private urlCustom = '/CustomData.php';
  private urlCustomDelete = '/CustomDelete.php';

  constructor(private http: HttpClient) { }

  postRandom(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }

  postUsers(form) {
    return this.http.post<any>(environment.serverUrl + this.urls, form);
  }

  postDelete(form) {
    return this.http.post<any>(environment.serverUrl + this.urlps, form);
  }

  postPoints(form) {
    return this.http.post<any>(environment.serverUrl + this.urlp, form);
  }

  postExit(form) {
    return this.http.post<any>(environment.serverUrl + this.urlExit, form);
  }

  postAddKick(form) {
    return this.http.post<any>(environment.serverUrl + this.urlAddKick, form);
  }

  postCheck(form) {
    return this.http.post<any>(environment.serverUrl + this.urlCheck, form);
  }

  postCustom(form) {
    return this.http.post<any>(environment.serverUrl + this.urlCustom, form);
  }

  postCustomDelete(form) {
    return this.http.post<any>(environment.serverUrl + this.urlCustomDelete, form);
  }
}
