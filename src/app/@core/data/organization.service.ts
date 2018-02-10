import { Injectable } from '@angular/core';
import { Config } from './../../app-config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const attr = require('dynamodb-data-types').AttributeValue;

@Injectable()
export class OrganizationService {
    public tree: any;
    public setting_basic: any;
    constructor(private http: HttpClient) {
        if (window.sessionStorage.getItem('id_token') !== null ||
            window.sessionStorage.getItem('id_token') !== undefined) {
            this.setting_basic = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Autorization': window.sessionStorage.getItem('id_token'),
                    'cache-control': 'no-cache',
                }),
            };
        } else {
            this.setting_basic = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'cache-control': 'no-cache',
                }),
            };
        }

        this.tree = [{
            'id': {
                'S': '6d65e88f-50be-9d05-d975-e90febc1f330',
            },
            'name': {
                'S': 'uno',
            },
        }, {
            'id': {
                'S': '2c493a54-03e4-ee75-cdd6-dc895869b4e0',
            },
            'name': {
                'S': 'unopuntouno',
            },
        }, {
            'id': {
                'S': 'bad691a9-bfef-9390-9ff8-1c8b846edc6b',
            },
            'name': {
                'S': 'dos',
            },
        }];
    }
    getTree() {
        return this.tree;
    }
    get(id) {
        return this.http.get(Config.PROD.ORGANIZATION + id, this.setting_basic);
    }
    post(element) {
        const body = JSON.stringify(element);
        return this.http.post(Config.PROD.ORGANIZATION, body, this.setting_basic);
    }
    put(element) {
        const body = JSON.stringify(element);
        return this.http.put(Config.PROD.ORGANIZATION + element.id, body, this.setting_basic);
    }
    delete(element) {
        return this.http.delete(Config.PROD.ORGANIZATION + element.id);
    }
}
