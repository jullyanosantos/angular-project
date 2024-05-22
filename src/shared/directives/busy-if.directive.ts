import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[busyIf]'
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

        if (isBusy) {
            // ebs.ui.setBusy(this._element.nativeElement);
        } else {
            // ebs.ui.clearBusy(this._element.nativeElement);
        }
    }
}
