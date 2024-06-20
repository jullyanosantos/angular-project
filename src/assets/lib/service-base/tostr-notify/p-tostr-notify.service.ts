import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';
import { Message, MessageService } from 'primeng/api';

export const CONSTANTS = {
    toasterSeverity: {
        toasterKey: 'test',
        success: 'success',
        info: 'info',
        warn: 'warn',
        error: 'error',
    },
    toasterTitle: {
        success: 'Aviso',
        info: 'Info',
        warn: 'Aviso',
        error: 'Erro',
    },
};

@Injectable({
    providedIn: 'root'
})
export class PrimengtoastrNotifyService {

    config = {
        life: 4000,
        position: 'top-bottom-right',
    };

    options: IndividualConfig;
    messageOptions: Message = {}

    constructor(
        private toastr: ToastrService,
        private messageService: MessageService
    ) {

        this.options = this.toastr.toastrConfig;
        this.options.positionClass = 'toast-top-right';
        this.options.timeOut = 3000;
        this.options.closeButton = true;
        this.options.enableHtml = true;
        this.options.progressBar = true;
        this.options.progressAnimation = "decreasing";
    }

    info(message?: string, title?: string, sticky?: boolean) {

        // this.messageService.clear();
        this.messageOptions = {};

        this.messageOptions!.severity = CONSTANTS.toasterSeverity.info;
        this.messageOptions!.summary = title || CONSTANTS.toasterTitle.info;
        this.messageOptions!.sticky = sticky || false;
        this.messageOptions!.detail = message;
        this.messageOptions!.life = this.config.life,

            this.messageService.add(this.messageOptions!);
    }

    success(message?: string, title?: string, sticky?: boolean, life?: number) {

        this.messageOptions = {};

        this.messageOptions!.severity = CONSTANTS.toasterSeverity.success;
        this.messageOptions!.summary = title || CONSTANTS.toasterTitle.success;
        this.messageOptions!.sticky = sticky || false;
        this.messageOptions!.detail = message;
        this.messageOptions!.life = life || this.config.life;

        this.messageService.add(this.messageOptions!);
    }

    warning(message?: string, title?: string, sticky?: boolean, life?: number) {

        this.messageOptions = {};

        this.messageOptions!.severity = CONSTANTS.toasterSeverity.warn;
        this.messageOptions!.summary = title || CONSTANTS.toasterTitle.warn;
        this.messageOptions!.sticky = sticky ? sticky : false;
        this.messageOptions!.detail = message;
        this.messageOptions!.life = life || this.config.life;

        this.messageService.add(this.messageOptions!);
    }

    error(message?: string, title?: string, sticky?: boolean, life?: number) {

        title = title == undefined ? "Erro" : title;
        this.messageOptions = {};

        this.messageOptions!.severity = CONSTANTS.toasterSeverity.error;
        this.messageOptions!.summary = title || CONSTANTS.toasterTitle.warn;
        this.messageOptions!.sticky = sticky ? sticky : false;
        this.messageOptions!.detail = message;
        this.messageOptions!.life = life || this.config.life;

        this.messageService.add(this.messageOptions!);
    }

    show(title?: string, message?: string, type?: string, sticky?: boolean, life?: number) {

        type = type == undefined ? 'success' : type;

        var typeTitle = type == "success" ? CONSTANTS.toasterTitle.success :
                        type == "warning" ? CONSTANTS.toasterTitle.warn :
                        type == "info" ? CONSTANTS.toasterTitle.info : CONSTANTS.toasterTitle.error

        title = title == undefined ? typeTitle : title;

        this.messageOptions = {};

        this.messageOptions!.severity = type;
        this.messageOptions!.summary = title;
        this.messageOptions!.sticky = sticky;
        this.messageOptions!.detail = message;
        this.messageOptions!.life = life || this.config.life;

        this.messageService.add(this.messageOptions!);
    }

    confirm(title?: string, message?: string, callback?: any) {

        title = title == undefined ? "Aviso" : title;

        var btnSim = "<button type='button' id='confirmationRevertYes' class='btn btn-success clear'>Sim</button>";
        var btnNao = "<button type='button' id='confirmationRevertNo' class='btn btn-danger clear'  style=\" margin-right: 19px;\">Não</button>";

        let options: IndividualConfig;
        options = this.toastr.toastrConfig;
        options.positionClass = 'toast-top-right';
        options.enableHtml = true;
        options.extendedTimeOut = 1500000;
        options.timeOut = 1500000;

        this.toastr.warning(message + "<br /><br />" + btnNao + btnSim, title, options)
            .onTap.subscribe(() => callback());
    }

    public progressToast(message: string, title: string, progressFn: () => number): ActiveToast<any> {
        let toast: ActiveToast<any> = this.toastr.info(message, title, {
            'extendedTimeOut': 1500000,
            'timeOut': 1500000, // we need to set a timeout otherwise ngx-toastr won't display the progressBar
            'enableHtml': true,
            'tapToDismiss': false,
            'progressBar': true,
            'progressAnimation': 'increasing'
        });

        // A bit "hacky", the ngx-toastr progress bar only works with its own progress method, based on the specified timeout, and cannot be controlled manually
        // That's why we have to specify a big timeout in the options
        // We overload the default progress method to use the one we want, this way, we can have a manual control of the progress bar
        (<any>toast).toastRef.componentInstance.updateProgress = () => {
            (<any>toast).toastRef.componentInstance.width = progressFn();
        };
        return toast;
    }
}