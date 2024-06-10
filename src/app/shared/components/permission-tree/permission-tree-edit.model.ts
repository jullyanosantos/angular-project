import { FlatPermissionDto } from "../../_models/roles/flat-permissionDto";

export interface PermissionTreeEditModel {

    permissions: FlatPermissionDto[];

    grantedPermissionNames: string[];

}