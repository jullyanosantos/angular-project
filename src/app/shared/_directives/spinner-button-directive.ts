import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[spinnerButton]',
    standalone: true
})
export class SpinnerButtonDirective {
    @Input('spinnerButton') isWaiting: boolean = false;
    @Input() busyText: string = "";

    private _button: any;

    originalInnerText: string = "";
    originalButtonInnerHtml: string = "";

    constructor(private el: ElementRef) {
        this._button = this.el.nativeElement;
    }

    ngOnInit() {
        // Save the original button text so I can restore it when waiting ends
        // this.originalInnerText = this.el.nativeElement.innerText;
    }

    ngAfterViewInit(): void {
        this.originalButtonInnerHtml = this._button.innerHTML;
    }

    ngOnChanges() {

        if (this.isWaiting) {
            // this.el.nativeElement.innerText = '<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>' +
            //     '<span>' + this.busyText + '</span>';

            this.originalInnerText = this.el.nativeElement.innerText;

            this.el.nativeElement.innerHTML = '<i class="pi pi-spin pi-spinner" style="font-size: 1rem"></i> ' +
                '<span>' + this.busyText + '</span>';
        } else {
            // if (this.el.nativeElement.innerText == 'Carregando...') {
            //     this.el.nativeElement.innerText = this.originalInnerText;
            // }
            this.el.nativeElement.innerText = this.originalInnerText != "" ? this.originalInnerText : this.el.nativeElement.innerText;
        }
        this.el.nativeElement.disabled = this.isWaiting;
    }
}