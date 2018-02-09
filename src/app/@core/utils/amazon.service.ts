import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Config } from './../../app-config';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';

const authData = {
    ClientId: Config.LOCAL.TOKEN.CLIENTE_ID, // Your client id here
    AppWebDomain: Config.LOCAL.BASEPATH,
    TokenScopesArray: Config.LOCAL.TOKEN.SCOPE,
    RedirectUriSignIn: Config.LOCAL.TOKEN.REDIRECT_URL,
    RedirectUriSignOut: Config.LOCAL.TOKEN.SIGN_OUT_REDIRECT_URL,
    // IdentityProvider: '<TODO: add identity provider you want to specify>', // e.g. 'Facebook',
    UserPoolId: Config.LOCAL.TOKEN.USER_POOL_ID, // Your user pool id here
};

@Injectable()
export class AmazonService {
    auth: CognitoAuth;
    constructor() {
        this.auth = new CognitoAuth(authData);
        this.getSesion();
        var curUrl = window.location.href;
        this.auth.parseCognitoWebResponse(curUrl);
    }

    getSesion() {
        if (window.sessionStorage.getItem('id_token') === null) {
            this.auth.getSession();
        }
    }

    signOut() {
        this.auth.signOut();
    }

}
