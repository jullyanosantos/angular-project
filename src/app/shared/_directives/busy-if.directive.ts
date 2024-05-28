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
        debugger
        if (isBusy === undefined) {
            return;
        }

        debugger
        if (isBusy) {
            if (core !== undefined) {
                core.ui.setBusy(this._element.nativeElement);
            }
        } else {
            if (core !== undefined) {
                core.ui.clearBusy(this._element.nativeElement);
            }
        }
    }
}
