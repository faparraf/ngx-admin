
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './../../app-config'
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

class ApoloComponent {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({ uri: 'https://api.example.com/graphql' }),
            cache: new InMemoryCache(),
        });
    }
}
