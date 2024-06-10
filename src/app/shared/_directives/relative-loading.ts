import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: "[relativeLoader]",
    standalone: true
  })
  export class RelativeLoaderDirective implements OnInit, OnChanges {
    private loader: HTMLElement;
    @Input() loading: boolean = false;
    constructor(private renderer: Renderer2, private el: ElementRef) {
        debugger
      this.loader = this.renderer.createElement("div"); // create loader
    }
    ngOnInit(): void {}
  
    ngOnChanges(): void {
      this.createSimpleLoader(); // execute create loader
      if (this.loading && this.el) {
        // hide the first element in the parent div containing directive
        // this should always be a component you want to replace with
        // the loader we are making
        this.renderer.setStyle(
          this.el.nativeElement.firstChild,
          "display",
          "none"
        );
        this.renderer.appendChild(this.el.nativeElement, this.loader);
      } else {
        this.renderer.removeChild(this.el.nativeElement, this.loader);
        this.renderer.setStyle(
          this.el?.nativeElement.firstChild,
          "display",
          "block"
        );
      }
    }
  
    createSimpleLoader() {
      /** add some style to the loader wrapper */
      this.renderer.setStyle(this.loader, "display", "flex");
      this.renderer.setStyle(this.loader, "flex-direction", "column");
      this.renderer.setStyle(this.loader, "justify-content", "center");
      this.renderer.setStyle(this.loader, "align-items", "center");
      // create loader spinner with custom scss
      /** Format of this loader is:
          <div class="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                 <div></div>
          </div>
      */
      const ldsRoller = this.renderer.createElement("div");
      this.renderer.addClass(ldsRoller, "lds-roller");
      [0, 1, 2, 3, 4, 5, 6, 7].forEach((value) => {
        const div = this.renderer.createElement("div");
        this.renderer.appendChild(ldsRoller, div);
      });
      this.renderer.appendChild(this.loader, ldsRoller);
    }
  }