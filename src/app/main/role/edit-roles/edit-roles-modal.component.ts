
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { BusyIfDirective } from '../../../shared/_directives/busy-if.directive';
import { ButtonBusyDirective } from '../../../shared/_directives/button-busy.directive';
import { SpinnerButtonDirective } from '../../../shared/_directives/spinner-button-directive';
import { FlatPermissionDto } from '../../../shared/_models/roles/flat-permissionDto';
import { GrantedPermissionName, RoleEdit } from '../../../shared/_models/roles/roleEdit';
import { RoleService } from '../../../shared/_services/role.service';
import { AppComponentBase } from "../../../shared/app-component-base";
import { PermissionTreeComponent } from '../../../shared/components/permission-tree/permission-tree.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
declare var $: any;

@Component({
    selector: 'app-edit-roles-modal',
    standalone: true,
    imports:
        [
            ButtonModule,
            CheckboxModule,
            FormsModule,
            CommonModule,
            ButtonBusyDirective,
            SpinnerButtonDirective,
            BusyIfDirective,
            ButtonBusyDirective,
            TreeModule,
            SelectComponent,
            PermissionTreeComponent
        ],
    templateUrl: './edit-roles-modal.component.html',
    styleUrls: ['./edit-roles-modal.component.css'],
    providers: [BsModalService, BsModalRef]
})
export class EditRolesComponent extends AppComponentBase implements OnInit {

    @ViewChild("createOreditRolesModal", { static: false }) viewModal?: ElementRef;
    @ViewChild('permissionTree', { static: true, read: PermissionTreeComponent }) permissionTree!: PermissionTreeComponent;
    @ViewChild('permissionTree', { static: false }) ptree!: PermissionTreeComponent;
    @ViewChild('roleDisplayName') roleDisplayNameField!: ElementRef;
    @Output() modalCreateOrEditRolesEmitter: EventEmitter<any> = new EventEmitter<any>();

    loading = false;
    role = new RoleEdit();
    permissions: FlatPermissionDto[] | undefined;
    grantedPermissionNames: string[] | undefined;

    grantedPermissionName: GrantedPermissionName[] | undefined
    checkedPermissionsMap: { [key: string]: boolean } = {};

    bsModalRef?: BsModalRef;

    constructor(
        injector: Injector,
        private modalService: BsModalService,
        private roleService: RoleService
    ) {
        super(injector);

    }

    ngOnInit(): void {

    }

    close() {

        $(this.viewModal?.nativeElement).modal("hide");
        // (this.viewModal?.nativeElement as HTMLElement).style.display = 'none';
        // document.body.classList.remove('modal-open');
        // document.querySelector('.modal-backdrop')?.classList.remove('show');
        // (this.viewModal?.nativeElement as HTMLElement).style.display = 'none';

        // document.querySelector('.modal-backdrop')?.remove();
    }

    show(id: number) {
        const self = this;

        self.roleService.getRolePermissionsForEdit(id)
            .pipe()
            .subscribe(result => {
                debugger

                if (result.data.role)
                    self.role = result.data.role;

                self.ptree.editData = result.data;

                // (this.viewModal?.nativeElement as HTMLElement).style.display = 'block';
                // (this.viewModal?.nativeElement as HTMLElement).classList.add('block');
                // // document.querySelector('.modal-backdrop')?.classList.add('show');
                // document.body.classList.add('modal-open');

                // // (document.querySelector('.modal-backdrop') as HTMLElement).style.display = 'block';

                // let el = document.createElement('div');
                // el.className = 'modal-backdrop fade show';
                // el.style.display = 'block';
                // document.body.appendChild(el);

                // this.bsModalRef = this.modalService.show(EditRolesComponent);

                $(this.viewModal?.nativeElement).modal("show");
            });

        // this.bsModalRef = this.modalService.show(EditRolesComponent, { initialState });
        // this.bsModalRef.content.closeBtnName = 'Close';
    }

    obterPermissao() {

        // setTimeout(() => {

        //     var aa = this.permissionTree.editData;

        // }, 0);

        this.roleService.getRolePermissionsForEdit(1)
            .pipe()
            .subscribe(result => {

                if (result.data.role)
                    this.role = result.data.role;

                debugger
                // this.permissionTree.editData = result.data;
            })
    }

    onShown(): void {
        this.roleDisplayNameField.nativeElement.focus();
    }

    save(): void {

        const self = this;

        setTimeout(() => {

            this.toatrService.success('Saved with successfully');
            this.close();
            this.modalCreateOrEditRolesEmitter.emit(null);

        }, 1000);
    }
}