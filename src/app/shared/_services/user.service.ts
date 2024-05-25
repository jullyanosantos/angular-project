import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    orders: any[] = [];

    constructor(
        private http: HttpClient) { }

    // getOrders(status: number) {
    //   return this.orders.filter(x => x.status == status);
    // }

    getRanking() {

        let url = '';

        return this.http.get<any>(url)
            .pipe(map(result => {
                debugger
                return result;
            }));
    }
    getLotes() {

        let url = '';

        return this.http.get<any>(url)
            .pipe(map(result => {
                debugger
                return result;
            }));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");
    }

    // getAllNewPedidos() {

    //   return this.orders.filter(x => x.status == 1);
    //   // return this.http.get<any>('app/shared/services/pedidos.json')
    //   //   .toPromise()
    //   //   .then(res => <Pedido[]>res.data)
    //   //   .then(data => {
    //   //     return data;
    //   //   });
    // }

    // getAllNInPreparing() {

    //   this.ordersInPreparing = this.orders.filter(x => x.status == 2);

    //   return this.ordersInPreparing;
    // }
}