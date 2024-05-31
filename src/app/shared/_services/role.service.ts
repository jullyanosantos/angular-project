import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseResult } from '../_models/base-result';
import { environment } from '../../../environments/environment';
import { Role } from '../_models/roles/role';
import { Observable } from 'rxjs';
import { GetRoleForEditOutputDto } from '../_models/roles/roleEdit';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private httpClient: HttpClient) { }

    getAll() {

        let url = `${environment.api}/assets/data-source/roles/roleList.json`;
        return this.httpClient.get<BaseResult<Role[]>>(url)
            .pipe(map(result => {
                debugger
                return result;
            }));
    }

    getRolePermissionsForEdit(id: number): Observable<any> {

        let url = `${environment.api}/assets/data-source/roles/roleEdit.json?`;

        if (id !== undefined)
            url += "Id=" + encodeURIComponent("" + id) + "&";
        url = url.replace(/[?&]$/, "");

        return this.httpClient.get<BaseResult<GetRoleForEditOutputDto>>(url)
            .pipe(map((result: any) => {
                return result;
            }));
    }
}