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
  selector: "nu-tab-content",
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./nu-tab-content.component.html"
})
export class NuTabContentComponent {
  @Input() nuContent: TemplateRef<void>;
  @Input() nuActive: boolean = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, "nu-tab-content");
  }
}
