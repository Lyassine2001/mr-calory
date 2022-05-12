import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AppUtil from '../common/app.util';

@Injectable()

export class ApplicationService {

  constructor(private _http: HttpClient) {}

  createAuthHeader() {
    const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  saveApplication(task: any) {
    return this._http.post('/api/application/create', task, { 'headers': this.createAuthHeader() });
  }

  getApplication(query: any) {
    return this._http.post('/api/application', query, { 'headers': this.createAuthHeader() })
  }

}