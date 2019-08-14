import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  ElementRef,
  Renderer2
} from "@angular/core";

@Component({
  selector: "nm-tab-content",
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./nm-tab-content.component.html"
})
export class NmTabContentComponent {
  @Input() nmContent: TemplateRef<void>;
  @Input() nmActive: boolean = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, "nm-tab-content");
  }
}
