import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AwsTransformService {

    static userArray: any[];
    static jsonArray: any[];

    constructor() {
    }

    static getElement(l, item): any {
        let element,
        type;
        for (const i in item) {
            if (item.hasOwnProperty(i)) {
                type = i;
                element = item[i];
            }
        }
        const o = new Object({
            valor:element,
            label:l,
            tipo:type,
        });
        return o;
    }

    static getElementAws(item) {
        let newTree = '{';
        item.forEach(element => {
            const data = '"' + element.label + '":{"' + element.tipo + '":"' + element.valor + '"}';
            newTree += data + ','
          });
        newTree = newTree.substring(0, newTree.length - 1) + '}';
        const object = JSON.parse(newTree);
        return object;
    }

    static getArray(item): any {
        const temporal = [];
        for (const i in item) {
            if (item.hasOwnProperty(i)) {
                let dato = new Object();
                dato = AwsTransformService.getElement(i, item[i]);
                temporal[temporal.length] = dato;
            }
        }
        return temporal;
    }

    static getJsonTree(oldTree) {
        const newTree = [];
        oldTree.forEach(element => {
            const data = AwsTransformService.getArray(element);
            newTree.push(data);
          });
        return newTree;
    }
}
