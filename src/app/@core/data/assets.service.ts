import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'
import { AwsTransformService } from '../utils/awsTransform.service';
const attr = require('dynamodb-data-types').AttributeValue;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const path = Config.PROD.BASEPATH;

@Injectable()
export class AssetsService {

    constructor(private http: HttpClient) {
        if (window.sessionStorage.getItem('id_token') !== null ||
            window.sessionStorage.getItem('id_token') !== undefined) {
            httpOptions.headers.append('Authorization', window.sessionStorage.getItem('id_token'));
        }
    }

    getAssets(org) {
        return this.http.get(Config.PROD.ORGANIZATION + org + Config.PROD.ASSETS, httpOptions);
    }

    initIteracion(element) {
        const body = JSON.stringify(element)
        return this.http.post(Config.PROD.INTERATION, body, httpOptions);
    }

    getSettings(org) {
        return this.http.get(Config.PROD.ORGANIZATION + org);
    }

    get(endpoint) {
        return this.http.get(path + endpoint);
    }
    EditAsset(element) {
        let body = attr.wrap(element);
        body = AwsTransformService.clearAWS(body);
        return this.http.put(Config.PROD.ASSET + element.serial, body, httpOptions);
    }
    addAsset(element) {
        const body = attr.wrap(element);
        return this.http.post(Config.PROD.ASSET, body, httpOptions);
    }
};
