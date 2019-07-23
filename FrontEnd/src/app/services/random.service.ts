import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  private url = '/RandomQueue.php';

  constructor(private http: HttpClient) { }

  postRandom(form) {
    return this.http.post<any>(environment.serverUrl + this.url, form);
  }
}
