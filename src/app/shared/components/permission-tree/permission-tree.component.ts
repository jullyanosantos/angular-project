import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '../../app-component-base';
import { ArrayToTreeConverterService } from './array-to-tree-converter.service';
import { PermissionTreeEditModel } from './permission-tree-edit.model';
import { TreeDataHelperService } from './tree-data-helper.service';
import * as _ from 'lodash-es';
import { FlatPermissionDto } from '../../_models/roles/flat-permissionDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'permission-tree',
    standalone: true,
    imports: [FormsModule, CommonModule, TreeModule],
    providers:[TreeDataHelperService],
    template:
        `<div class='form-group'>
            <input type='text' (input)="filterPermissions($event)" [(ngModel)]="filter" class='form-control' placeholder="Pesquisar..." >
        </div>
        <p-tree [value]="treeData" [(selection)]="selectedPermissions" selectionMode="checkbox" (onNodeSelect)="nodeSelect($event)" [propagateSelectionUp]="false"></p-tree>
        `
})
export class PermissionTreeComponent extends AppComponentBase {

    set editData(val: PermissionTreeEditModel) {
        debugger
        this.setTreeData(val.permissions);
        this.setSelectedNodes(val.grantedPermissionNames);
    }

    treeData: any;
    selectedPermissions: TreeNode[] = [];
    filter = '';

    constructor(
        injector: Injector,
        private _arrayToTreeConverterService: ArrayToTreeConverterService,
        private _treeDataHelperService: TreeDataHelperService
    ) {
        super(injector);
    }

    setTreeData(permissions: FlatPermissionDto[]) {
        debugger
        this.treeData = this._arrayToTreeConverterService.createTree(permissions, 'parentName', 'name', null, 'children',
            [{
                target: 'label',
                source: 'displayName'
            },
            {
                target: 'expandedIcon',
                value: 'fa fa-folder-open text-warning'
            },
            {
                target: 'collapsedIcon',
                value: 'fa fa-folder text-warning'
            },
            {
                target: 'expanded',
                value: true
            }]);
    }

    setSelectedNodes(grantedPermissionNames: string[]) {
        this.selectedPermissions = [];
        _.forEach(grantedPermissionNames, permission => {
            let item = this._treeDataHelperService.findNode(this.treeData, { data: { name: permission } });
            if (item) {
                this.selectedPermissions.push(item);
            }
        });
    }

    getGrantedPermissionNames(): string[] {
        if (!this.selectedPermissions || !this.selectedPermissions.length) {
            return [];
        }

        let permissionNames = [];

        for (let i = 0; i < this.selectedPermissions.length; i++) {
            permissionNames.push(this.selectedPermissions[i].data.name);
        }

        return permissionNames;
    }

    nodeSelect(event: any) {
        let parentNode = this._treeDataHelperService.findParent(this.treeData, { data: { name: event.node.data.name } });

        while (parentNode != null) {
            this.selectedPermissions.push(parentNode);
            parentNode = this._treeDataHelperService.findParent(this.treeData, { data: { name: parentNode.data.name } });
        }
    }

    filterPermissions(event: any): void {
        this.filterPermission(this.treeData, this.filter);
    }

    filterPermission(nodes: any, filterText: any): any {
        _.forEach(nodes, node => {
            debugger
            if (node.data.displayName.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                this.showParentNodes(node);
            } else {
                node.styleClass = 'hidden-tree-node';
            }

            if (node.children && node.children.length > 0) {
                this.filterPermission(node.children, filterText);
            }
        });
    }

    showParentNodes(node: any): void {
        if (!node.parent) {
            return;
        }

        node.styleClass = node.parent.styleClass = '';
        this.showParentNodes(node.parent);
    }
}