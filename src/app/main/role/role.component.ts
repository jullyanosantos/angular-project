import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BusyIfDirective } from '../../shared/_directives/busy-if.directive';
import { ButtonBusyDirective } from '../../shared/_directives/button-busy.directive';
import { SpinnerButtonDirective } from '../../shared/_directives/spinner-button-directive';
import { AppComponentBase } from '../../shared/app-component-base';
import { RoleService } from '../../shared/_services/role.service';
import { EditRolesComponent } from './edit-roles/edit-roles-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PermissionTreeComponent } from '../../shared/components/permission-tree/permission-tree.component';
import { RippleModule } from 'primeng/ripple';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-role',
  standalone: true,
  imports:
    [
      EditRolesComponent,
      RippleModule, 
      ButtonModule,
      FormsModule,
      CommonModule,
      ButtonBusyDirective,
      SpinnerButtonDirective,
      BusyIfDirective,
      PermissionTreeComponent
    ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
  providers: [BsModalService]
})
export class RoleComponent extends AppComponentBase implements OnInit {

  
  modalRef?: BsModalRef;
  roles: any = [];
  loading = false;
  @ViewChild('permissionTreee') ptree!: PermissionTreeComponent;
  @ViewChild('createOreditRolesModal') createOreditRolesModal!: EditRolesComponent;
  
  constructor(injector: Injector,
    private roleService: RoleService,
    private modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.reloadPage();
  }

  reloadPage() {
    this.getRoles();
  }

  getRoles(): void {
    this.loading = true;

    this.roleService.getAll()
      .subscribe({
        next: (resp) => {
          this.roles = resp.data.list;
        },
        error: (err) => {
          this.alertService.error("Error getting Roles");
          this.loading = false;
        },
        complete: () => {
          setTimeout(() => {
            this.loading = false
          }, 2000);
        }
      });
  }

  openModal(id: number) {
    if (id) {
      debugger
      this.createOreditRolesModal.show(id);

      // this.createOreditRolesModal.show(userId);

      // this.modalRef = this.modalService.show(
      //   viewUserTemplate,
      //   Object.assign({}, { class: 'gray modal-lg' })
      // );
    }
  }

}
