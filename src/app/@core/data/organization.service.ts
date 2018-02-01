import { Injectable } from '@angular/core';
import { Config } from './../../app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class OrganizationService {
  constructor(private http:HttpClient) {
  }
  get() {
      return this.http.get(Config.PROD.ORGANIZATION);
  }
  post(element) {
      const body = JSON.stringify(element);
      return this.http.post(Config.PROD.ORGANIZATION, body, httpOptions);
  }
  put(element) {
      const body = JSON.stringify(element);
      return this.http.put(Config.PROD.ORGANIZATION + element.id, body, httpOptions);
  }
  delete(element) {
      return this.http.delete(Config.PROD.ORGANIZATION  + element.id);
  }
}
