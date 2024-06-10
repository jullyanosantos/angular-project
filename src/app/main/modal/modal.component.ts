import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ButtonBusyDirective } from "src/app/shared/_directives/button-busy.directive";
import { RelativeLoaderDirective } from "src/app/shared/_directives/relative-loading";
import { SpinnerButtonDirective } from "src/app/shared/_directives/spinner-button-directive";

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, SpinnerButtonDirective, ButtonBusyDirective, RelativeLoaderDirective],
  standalone: true,
})
export class ModalComponent implements OnInit {

  @ViewChild('modalExemplo') modalExemplo!: ElementRef;
  @ViewChild('bodyDiv') body?: ElementRef;

  ngOnInit(): void {

  }

  opemModal() {

    debugger
    $(this.modalExemplo.nativeElement).modal('show');

  }

  closeModal() {

    debugger
    $(this.modalExemplo.nativeElement).modal('hide');

  }
}