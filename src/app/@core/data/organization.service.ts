import { Injectable } from '@angular/core';
import { Config } from './../../app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const attr = require('dynamodb-data-types').AttributeValue;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable()
export class OrganizationService {
    public tree: any;
    public setting_basic: any;
    constructor(private http: HttpClient) {
        if (window.sessionStorage.getItem('id_token') !== null ||
            window.sessionStorage.getItem('id_token') !== undefined) {
            httpOptions.headers.append('Authorization', window.sessionStorage.getItem('id_token'));
        }
    }
    getTree() {
        return this.http.get(Config.PROD.ORGANIZATION + '27a6200d-c9f2-4483-9469-6fee72e00e05/tree',
            this.setting_basic);
    }
    get(id) {
        return this.http.get(Config.PROD.ORGANIZATION + id, this.setting_basic);
    }
    post(element) {
        const body = JSON.stringify(element);
        return this.http.post(Config.PROD.ORGANIZATION, body, this.setting_basic);
    }
    put(element) {
        return this.http.put(Config.PROD.ORGANIZATION + element.id.S, element, this.setting_basic);
    }
    delete(element) {
        return this.http.delete(Config.PROD.ORGANIZATION + element.id);
    }
    editProcess(element, id) {
        const body = JSON.stringify(element);
        return this.http.put(Config.PROD.ORGANIZATION + element.id, body, this.setting_basic);
    }
}

