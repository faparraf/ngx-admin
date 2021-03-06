import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Config } from './../../app-config';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AutenticationService {

    private params: any;
    public session = null;
    private setting_basic: any;
    public payload: any;
    public logOutUrl: any;

    constructor(private http: HttpClient) {
        this.setting_basic = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'authorization': 'Basic ' + btoa(Config.LOCAL.TOKEN.CLIENTE_ID + ':'
                    + Config.LOCAL.TOKEN.CLIENT_SECRET),
                'cache-control': 'no-cache',
            }),
        };
        this.logOutUrl = '';
        this.payload = { username: '' };
        this.timer();
    }

    public post(url, data, header) {
        const body = JSON.stringify(data);
        return this.http.post(url, body, header)
    }

    public getLogoutUrl() {

    }

    getPayload(): any {
        if (this.live()) {
            const id_token = window.sessionStorage.getItem('id_token').split('.');
            return JSON.parse(atob(id_token[1]));
        } else {
            return false;
        }
    }

    public getToken() {
        if (window.sessionStorage.getItem('code') !== null &&
            window.sessionStorage.getItem('id_token') === null) {
            let url = Config.LOCAL.TOKEN.REFRESH_TOKEN;
            const dato = {};
            url += '?grant_type=authorization_code';
            url += '&client_id=' + Config.LOCAL.TOKEN.CLIENTE_ID;
            url += '&code=' + window.sessionStorage.getItem('code');
            url += '&redirect_uri=' + Config.LOCAL.TOKEN.REDIRECT_URL;
            this.post(url, dato, this.setting_basic).subscribe(
                data => {
                    for (const i in data) {
                        if (data.hasOwnProperty(i)) {
                            window.sessionStorage.setItem(i, data[i]);
                        }
                    }
                    this.session = data;
                    this.setExpiresAt();
                    this.clearUrl();
                });
        }
        this.timer();
    }

    clearUrl() {
        const uri = window.location.toString();
        if (uri.indexOf('?') > 0) {
            const clean_uri = uri.substring(0, uri.indexOf('?'));
            window.history.replaceState({}, document.title, clean_uri);
        }
    }

    public init() {
        const queryString = location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let m;

        while (!!(m = regex.exec(queryString))) {
            if (window.sessionStorage.getItem(decodeURIComponent(m[1])) !== undefined) {
                window.sessionStorage.setItem(decodeURIComponent(m[1]), decodeURIComponent(m[2]))
            }
        }
        if (!this.live()) {
            this.getToken();
        } else {
            const id_token = window.sessionStorage.getItem('id_token').split('.');
            this.payload = JSON.parse(atob(id_token[1]));
            this.logOutUrl = Config.LOCAL.TOKEN.SIGN_OUT_URL;
            this.logOutUrl += '?client_id=' + Config.LOCAL.TOKEN.CLIENTE_ID;
            this.logOutUrl += '&logout_uri=' + Config.LOCAL.TOKEN.SIGN_OUT_REDIRECT_URL;
        }
    }

    public logout() {
        location.href = this.logOutUrl;
        sessionStorage.clear();
    }

    public login() {
        location.href = this.getAuthorizationUrl();
    }

    public live() {
        if (window.sessionStorage.getItem('id_token') !== null) {
            return true;
        } else {
            return false;
        }
    }

    public getAuthorizationUrl(): string {
        this.params = Config.LOCAL.TOKEN;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        let url = this.params.AUTORIZATION_URL + '?' +
            'client_id=' + encodeURIComponent(this.params.CLIENTE_ID) + '&' +
            'redirect_uri=' + encodeURIComponent(this.params.REDIRECT_URL) + '&' +
            'response_type=' + encodeURIComponent(this.params.RESPONSE_TYPE) + '&' +
            'scope=' + this.params.SCOPE;
        if (this.params.nonce) {
            url += '&nonce=' + encodeURIComponent(this.params.nonce);
        }
        url += '&state=' + encodeURIComponent(this.params.state);
        return url;
    }

    refresh() {
        const url = Config.LOCAL.TOKEN.REFRESH_TOKEN + '?' +
            'grant_type=' + encodeURIComponent('refresh_token') + '&' +
            'refresh_token=' + encodeURIComponent(window.sessionStorage.getItem('refresh_token')) + '&' +
            'redirect_uri=' + encodeURIComponent(Config.LOCAL.TOKEN.REDIRECT_URL);
        const dato = {};

        this.post(url, dato, this.setting_basic).subscribe(
            data => {
                for (const i in data) {
                    if (data.hasOwnProperty(i)) {
                        window.sessionStorage.setItem(i, data[i]);
                    }
                }
                this.session = data;
                window.sessionStorage.removeItem('expires_at');
                this.setExpiresAt();
            });
    }

    setExpiresAt() {
        if (window.sessionStorage.getItem('expires_at') === null) {
            const expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() +
                parseInt(window.sessionStorage.getItem('expires_in'), 10) - 60);
            window.sessionStorage.setItem('expires_at', expires_at.toUTCString());
        }
    }

    expired() {
        return (new Date(window.sessionStorage.getItem('expires_at')) < new Date());
    }

    private generateState() {
        const text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    }

    timer() {
        Observable.interval(5000).subscribe(x => {
            if (window.sessionStorage.getItem('expires_at') !== null) {
                if (this.expired()) {
                    this.refresh();
                }
            }
        });
    }
}
