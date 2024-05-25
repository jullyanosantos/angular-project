import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[spinnerButton]',
    standalone: true
})
export class SpinnerButtonDirective {
    @Input('spinnerButton') isWaiting: boolean = false;

    originalInnerText: string = "";
    
    constructor(private el: ElementRef) { }

    ngOnInit() {
        // Save the original button text so I can restore it when waiting ends
        this.originalInnerText = this.el.nativeElement.innerText;
    }

    ngOnChanges() {
        if (this.isWaiting) {
            this.el.nativeElement.innerText = 'waiting...';
        } else {
            if (this.el.nativeElement.innerText == 'waiting...') {
                this.el.nativeElement.innerText = this.originalInnerText;
            }
        }
        this.el.nativeElement.disabled = this.isWaiting;
    }
}