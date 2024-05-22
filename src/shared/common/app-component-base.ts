import { Injector } from "@angular/core";

export abstract class AppComponentBase {

    // appSession: AppSessionService;
    // sweetAlertService: SweetAlertService;

    constructor(injector: Injector) {
    
        // this.sweetAlertService = injector.get(SweetAlertService);
        // this.appSession = injector.get(AppSessionService);
    }
}