import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

var parent: any;
@Directive({
    selector: '[busyIf]',
    standalone: true
})
export class BusyIfDirective {

    private freezeHtml: HTMLElement;
    @Input() busyLoadingText: string = "";
    @Input() set busyIf(isBusy: boolean) {

        this.refreshState(isBusy);
    }

    constructor(
        private renderer: Renderer2,
        private _element: ElementRef
    ) {

        debugger
        this.freezeHtml = this.renderer.createElement("div"); // create loader
        this.freezeHtml.classList.add('freeze-ui');

    }

    refreshState(isBusy: boolean): void {
        if (isBusy === undefined) {
            return;
        }

        if (isBusy) {
            
            this.setBusy();

        } else {

            this.clearBusy()
        }
    }

    private setBusy(): void {

        if (this._element.nativeElement) {
            parent = this._element.nativeElement.parentElement;
        }

        this.freezeHtml.setAttribute('data-text', this.busyLoadingText || ' ');

        if (this._element) {
            this.freezeHtml.style.position = 'absolute';
        }

        parent.appendChild(this.freezeHtml);

    }

    private clearBusy(): void {

        if (this._element) {
            this.freezeHtml = this._element.nativeElement.parentElement.querySelector('.freeze-ui');
        } else {
            this.freezeHtml = document.querySelector('.freeze-ui')!;
        }

        if (this.freezeHtml) {
            this.freezeHtml.classList.add('is-unfreezing');

            let self = this;
            setTimeout(function () {

                if (self) {
                    self.freezeHtml.classList.remove('is-unfreezing');
                    if (self.freezeHtml.parentElement) {
                        self.freezeHtml.parentElement.removeChild(self.freezeHtml);
                    }
                }
            }, 250);
        }
    }
}