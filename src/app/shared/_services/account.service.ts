import { Injectable } from '@angular/core';
import { UserAuthInfo } from '../models/user-auth-info';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {

    private userAuthInfoObject: BehaviorSubject<UserAuthInfo>;
    public user: Observable<User> | undefined;
    public userAuthInfo: Observable<UserAuthInfo>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userAuthInfoObject = new BehaviorSubject<UserAuthInfo>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.userAuthInfo = this.userAuthInfoObject.asObservable();
    }

    public get userAuthInfoValue(): UserAuthInfo {
        return this.userAuthInfoObject.value;
    }

    public temPermissao(rolesVerificar: string[], permissoesDoUsuario: any[]): boolean {

        console.log(rolesVerificar);
        console.log(permissoesDoUsuario);

        for (let role of rolesVerificar) {

            var permissoes = permissoesDoUsuario.filter(x => x.claimValue == "true")
                .map(x => x.claimType)

            if (permissoes.includes(role))
                return true;

            // if (permissoesDoUsuario.includes(role))
            //     return true;
        }
        return false;
    }

    //teste  
    public verificarRole(rolesFuncionalidade: string[]): boolean {
        // const roleUsuario = JSON.parse(localStorage.getItem("user")).claims;
        // return this.temPermissao(rolesFuncionalidade, roleUsuario);
        return true;
    }

    // This method can be called a couple of different ways
    // *hasClaim="'claimType'"  // Assumes claimValue is true
    // *hasClaim="'claimType:value'" // Compares claimValue to value
    // *hasClaim="['claimType1','claimType2:value','claimType3']"
    hasClaim(claimType: any): boolean {
        let ret: boolean = false;
        if (claimType === undefined || claimType === null) { return false; }

        // See if an array of values was passed in.
        if (typeof claimType === 'string') {
            ret = this.isClaimValid(claimType);
        }
        else {
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < claimType.length; index++) {
                ret = this.isClaimValid(claimType[index]);

                // ret = this.isClaimValid(claimType[index].claimType.concat(":", claimType[index].claimValue));

                if (ret) {
                    break;
                }
            }
        }

        return ret;
    }

    private isClaimValid(claimType: string): boolean {
        let ret: boolean = false;
        let auth: UserAuthInfo = new UserAuthInfo()!;
        let claimValue: string = "";

        // Retrieve security object
        auth = this.userAuthInfoValue;

        if (auth) {
            // See if the claim type has a value
            // *hasClaim="'claimType:value'"
            if (claimType.indexOf(':') >= 0) {
                const words: string[] = claimType.split(':');
                claimType = words[0].toLowerCase();
                claimValue = words[1];
            }
            else {
                claimType = claimType.toLowerCase();
                claimValue = claimValue ? claimValue : 'true'; //'canView';
            }

            // Attempt to find the claim
            ret = auth.claims.find(
                c => c.claimType.toLowerCase() === claimType
                    && c.claimValue === claimValue) != null;
        }
        return ret;
    }
}