import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PrimengtoastrNotifyService } from 'src/assets/lib/service-base/tostr-notify/p-tostr-notify.service';
import { AlertService } from '../../assets/lib/service-base/alert/alert.service';
import { SweetAlertService } from '../../assets/lib/service-base/sweet-alert/sweet-alert-service';
import { ToastrNotifyService } from '../../assets/lib/service-base/tostr-notify/tostr-notify.service';

export abstract class AppComponentBase {

    sweetAlertService: SweetAlertService;
    alertService: AlertService;
    toatrService: ToastrNotifyService;
    ptoastrNotifyService: PrimengtoastrNotifyService;
    translateService: TranslateService;

    constructor(injector: Injector) {
        this.sweetAlertService = injector.get(SweetAlertService);
        this.alertService = injector.get(AlertService);
        this.toatrService = injector.get(ToastrNotifyService);
        this.translateService = injector.get(TranslateService);
        this.ptoastrNotifyService = injector.get(PrimengtoastrNotifyService);
    }
}