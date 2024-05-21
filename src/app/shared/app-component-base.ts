import { Injector } from '@angular/core';
import { SweetAlertService } from './components/sweet-alert/sweet-alert-service';

export abstract class AppComponentBase {
    
    sweetAlertService: SweetAlertService;

    constructor(injector: Injector) {
        this.sweetAlertService = injector.get(SweetAlertService);
    }
}