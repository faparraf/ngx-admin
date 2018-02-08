import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
const attr = require('dynamodb-data-types').AttributeValue;

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
            valor: element,
            label: l,
            tipo: type,
        });
        return o;
    }

    static getNormalElement(l, item): any {
        let element,
            type;
        for (const i in item) {
            if (item.hasOwnProperty(i)) {
                type = i;
                element = item[i];
            }
        }
        const o = new Object({
            valor: element,
            label: l,
            tipo: type,
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

    // Elemento de columnas para smartTable (assets)
    static getElementColumnTable(element) {
        return '"' + element.M.field.S + '":{"title": "' + element.M.label.S + '"}';
    }

    // Array de columnas para smartTable (assets)
    static getColumnTable(org) {
        let array = '{';
        org.Item.fields.L.forEach(element => {
            array += AwsTransformService.getElementColumnTable(element) + ',';
        });
        array = array.substring(0, array.length - 1) + '}';
        return JSON.parse(array);
    }

    // Array de columnas para smartTable (edición)
    static getColumnTableArray(org) {
        const array = [];
        org.Item.fields.L.forEach(element => {
            array.push(attr.unwrap(element.M));
        });
        return array;
    }

    // objeto AWS de columnas smartTable LocalDataSource
    static getColumnTableArrayInverse(org) {
        const array = [];
        org.data.forEach(element => {
            array.push({ M: attr.wrap(element) });
        });
        const object = { fields: { L: array } };
        return object;
        // console.log(object);
    }

    static getNormalArray(list) {
        const array = [];
        list.Items.forEach(element => {
            array.push(attr.unwrap(element));
        });
        return array;
    }
}
