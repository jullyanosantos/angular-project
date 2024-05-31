import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[busyIf]',
    standalone: true
})
export class BusyIfDirective {

    @Input() set busyIf(isBusy: boolean) {

        this.refreshState(isBusy);
    }

    constructor(
        private _element: ElementRef
    ) { }

    refreshState(isBusy: boolean): void {
        if (isBusy === undefined) {
            return;
        }
        
        if (core != undefined) {
            if (isBusy) {
                core.ui.setBusy(this._element.nativeElement);

            } else {
                core.ui.clearBusy(this._element.nativeElement);
            }
        }
    }
}