import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private urlP = '/ShowPoints.php';
  private urlD = '/Disconnect.php';
  private urlSEP = '/ShowEditPreferences.php';
  private urlChange = '/ChangeStatus.php';

  constructor(private http: HttpClient) { }

  postP(form) {
    return this.http.post<any>(environment.serverUrl + this.urlP, form);
  }

  postD(form) {
    return this.http.post<any>(environment.serverUrl + this.urlD, form);
  }

  postSEP(form) {
    return this.http.post<any>(environment.serverUrl + this.urlSEP, form);
  }

  postChange(form) {
    return this.http.post<any>(environment.serverUrl + this.urlChange, form);
  }
}
