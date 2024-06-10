import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';

@Injectable({
    providedIn: 'root'
})
export class ArrayToTreeConverterService {

    createTree(array: any[], parentIdProperty: any, idProperty: any, parentIdValue: any, childrenProperty: string, fieldMappings: any): any {
        let tree: any = [] = [];

        let nodes = _.filter(array, [parentIdProperty, parentIdValue]);

        _.forEach(nodes, node => {
            let newNode: any = {
                data: node
            };

            this.mapFields(node, newNode, fieldMappings);

            newNode[childrenProperty] = this.createTree(
                array,
                parentIdProperty,
                idProperty,
                node[idProperty],
                childrenProperty,
                fieldMappings
            );

            tree.push(newNode);
        });

        return tree;
    }

    mapFields(node: any, newNode: any, fieldMappings: any): void {
        _.forEach(fieldMappings, fieldMapping => {
            if (!fieldMapping['target']) {
                return;
            }

            if (fieldMapping.hasOwnProperty('value')) {
                newNode[fieldMapping['target']] = fieldMapping['value'];
            } else if (fieldMapping['source']) {
                newNode[fieldMapping['target']] = node[fieldMapping['source']];
            } else if (fieldMapping['targetFunction']) {
                newNode[fieldMapping['target']] = fieldMapping['targetFunction'](node);
            }
        });
    }
}