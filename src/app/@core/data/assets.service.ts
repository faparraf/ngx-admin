import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'
const attr = require('dynamodb-data-types').AttributeValue;

const httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json' }),
};
httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
httpOptions.headers.append('Access-Control-Allow-Headers', 'Content-Type');

const path = Config.PROD.BASEPATH;


@Injectable()
export class AssetsService {

    constructor(private http: HttpClient) {
    }

    getAssets(org) {
        return this.http.get(Config.PROD.ORGANIZATION + org + Config.PROD.ASSETS, httpOptions);
    }

    getSettings(org) {
        return this.http.get(Config.PROD.ORGANIZATION + org);
    }

    get(endpoint) {
        return this.http.get(path + endpoint);
    }
    EditAsset(element) {
        const body = attr.wrap(element);
        return this.http.put(Config.PROD.ASSET + element.serial, body, httpOptions);
    }
    addAsset(element) {
        const body = attr.wrap(element);
        return this.http.post(Config.PROD.ASSET, body, httpOptions);
    }
};
