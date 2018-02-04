import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const path =  Config.PROD.BASEPATH;


@Injectable()
export class ClustService {

    constructor(private http:HttpClient) {
    }

    get(endpoint) {
        return this.http.get(path + endpoint);
    }
    post(endpoint, element) {
        const body = JSON.stringify(element);
        return this.http.post(path + endpoint, body, httpOptions);
    }
    put(endpoint, element) {
        const body = JSON.stringify(element);
        return this.http.put(path + endpoint + element.id, body, httpOptions);
    }
    delete(endpoint, element) {
        return this.http.delete(path + endpoint + element.id);
    }
};
