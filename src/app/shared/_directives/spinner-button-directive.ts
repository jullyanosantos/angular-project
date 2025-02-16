import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[spinnerButton]',
    standalone: true
})
export class SpinnerButtonDirective {
    @Input('spinnerButton') isWaiting: boolean = false;
    @Input() busyText: string = "";

    private _button: any;
    private _originalButtonInnerHtml: string = "";

    originalInnerText: string = "";
    originalButtonInnerHtml: string = "";

    constructor(private el: ElementRef) {
        // // debugger
        setTimeout(() => {
            this._button = this.el.nativeElement;
            this._originalButtonInnerHtml = this._button.innerHTML;
            this.originalButtonInnerHtml = this._button.innerHTML;
        }, 100);
    }

    ngOnInit() {
        // Save the original button text so I can restore it when waiting ends
        // this.originalInnerText = this.el.nativeElement.innerText;
    }

    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this._button = this.el.nativeElement;
        //     this._originalButtonInnerHtml = this._button.innerHTML;
        //     this.originalButtonInnerHtml = this._button.innerHTML;
        // }, 300);
    }

    ngOnChanges() {

        setTimeout(() => {
            this.refreshState(this.isWaiting);
        }, 200);
    }

    refreshState(isWaiting: boolean): void {

        this.originalButtonInnerHtml = this._button.innerHTML;

        if (isWaiting) {
            // this.el.nativeElement.innerText = '<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>' +
            //     '<span>' + this.busyText + '</span>';

            this.originalInnerText = this.el.nativeElement.innerText;

            this.el.nativeElement.innerHTML = '<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i> ' +
                '<span>' + this.busyText + '</span>';
        } else {
            // if (this.el.nativeElement.innerText == 'Carregando...') {
            //     this.el.nativeElement.innerText = this.originalInnerText;
            // }

            //this.el.nativeElement.innerText = this.originalInnerText != "" ? this.originalInnerText : this.el.nativeElement.innerText;
            this.el.nativeElement.innerHTML = this._originalButtonInnerHtml; //this.originalButtonInnerHtml;
        }

        this.el.nativeElement.disabled = isWaiting
    }
}