
import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable()
class ApoloComponent {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({ uri: Config.LOCAL.GRAPHQL }),
            cache: new InMemoryCache(),
        });
    }
}
