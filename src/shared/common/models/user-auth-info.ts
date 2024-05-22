import { Claims } from './claims';

export class UserAuthInfo {
    userId: number | undefined;
    userName: string | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    token: string | undefined;
    photo: string | undefined;
    claims: Claims[] = [];
}