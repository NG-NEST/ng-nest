import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  ElementRef,
  Renderer2
} from '@angular/core';
import { XBoolean } from '@ng-nest/ui/core';

@Component({
  selector: 'x-tab-content',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab-content.component.html'
})
export class XTabContentComponent {
  @Input() content!: TemplateRef<void>;
  @Input() active: XBoolean = false;
  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'x-tab-content');
  }
}
