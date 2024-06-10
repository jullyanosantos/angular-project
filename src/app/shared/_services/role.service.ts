import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseResult } from '../_models/base-result';
import { environment } from '../../../environments/environment';
import { Role } from '../_models/roles/role';
import { Observable } from 'rxjs';
import { GetRoleForEditOutputDto } from '../_models/roles/roleEdit';
import { PagedResult } from '../_models/paged-result';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<BaseResult<PagedResult<Role>>> {

        let url = `${environment.api}/assets/data-source/roles/rolesList.json`;
        return this.httpClient.get<BaseResult<PagedResult<Role>>>(url)
            .pipe(map(result => {
                return result;
            }));
    }

    getRolePermissionsForEdit(id: number | undefined): Observable<any> {

        // let url = `${environment.api}/assets/data-source/roles/roleEdit.json?`;
        let url = `${environment.api}/assets/data-source/roles/`;

        // if (id !== undefined)
        //     url += "Id=" + encodeURIComponent("" + id) + "&";
        // url = url.replace(/[?&]$/, "");

        if (id !== undefined) {
            url += `rolesEdit${id}.json`
        }

        return this.httpClient.get<BaseResult<GetRoleForEditOutputDto>>(url)
            .pipe(map((result: any) => {
                return result;
            }));
    }
}