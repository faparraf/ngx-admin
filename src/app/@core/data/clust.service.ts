import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ClustService {

    constructor(private http: HttpClient) {
        if (window.sessionStorage.getItem('id_token') !== null ||
            window.sessionStorage.getItem('id_token') !== undefined) {
            httpOptions.headers.append('Authorization', window.sessionStorage.getItem('id_token'));
        }
    }

    getCompose(element) {
        const body = JSON.stringify(element);
        return this.http.post(Config.LOCAL.ASSET_ITERACION, body, httpOptions);
    }

    clusterizar(element) {
        const body = JSON.stringify(element);
        return this.http.post(Config.LOCAL.CLUSTERIZACION, body, httpOptions);
    }

};
