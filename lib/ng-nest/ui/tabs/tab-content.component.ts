import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  OnInit,
  inject
} from '@angular/core';
import { XBoolean } from '@ng-nest/ui/core';

@Component({
  selector: 'x-tab-content',
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab-content.component.html'
})
export class XTabContentComponent implements OnInit {
  @Input() content!: TemplateRef<void>;
  @Input() active: XBoolean = false;
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'x-tab-content');
  }
}
