import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';

@Injectable()
export class TreeDataHelperService {

    findNode(data: any, selector: any): any {
        let nodes = _.filter(data, selector);
        if (nodes && nodes.length === 1) {
            return nodes[0];
        }

        let foundNode:any = null;

        _.forEach(data, d => {
            if (!foundNode) {
                foundNode = this.findNode(d.children, selector);
            }
        });

        return foundNode;
    }

    findParent(data: any, nodeSelector: any) {
        let node = this.findNode(data, nodeSelector);
        if (!node) {
            return null;
        }

        return node.parent;
    }
}