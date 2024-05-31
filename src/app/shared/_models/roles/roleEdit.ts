import { FlatPermissionDto } from "./flat-permissionDto";

export class RoleEdit {
    id: number | undefined;
    name: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    isDefault: boolean | undefined;

    // init(_data?: any) {
    //     if (_data) {
    //         this.id = _data["id"];
    //         this.name = _data["name"];
    //         this.displayName = _data["displayName"];
    //         this.normalizedName = _data["normalizedName"];
    //         this.description = _data["description"];
    //         if (Array.isArray(_data["grantedPermissions"])) {
    //             this.grantedPermissions = [] as any;
    //             for (let item of _data["grantedPermissions"])
    //                 this.grantedPermissions.push(item);
    //         }
    //     }
    // }
}

export class GetRoleForEditOutput {
    role: RoleEdit | undefined;
    grantedPermissions: GrantedPermissionName[] | undefined
}

export class CreateOrUpdateRolePermissiomInput {
    role: RoleEdit | undefined;
    grantedPermissionNames!: string[];
}

export class CreateOrUpdateRoleInput {
    role: RoleEdit | undefined;
    grantedPermissions: GrantedPermissionName[] | undefined;
}

export class GrantedPermissionName {
    id: number | undefined;
    claimType: string | undefined;
    claimValue: boolean | undefined
}

export class GetRoleForEditOutputDto {
    role: RoleEdit | undefined;
    grantedPermissionNames: [] | undefined;
    permissions: FlatPermissionDto[] | undefined
}