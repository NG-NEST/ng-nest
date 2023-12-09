import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject
} from '@angular/core';
import { XTypographyPrefix, XTypographyProperty } from './typography.property';

@Component({
  selector: 'x-typography',
  standalone: true,
  templateUrl: './typography.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTypographyComponent extends XTypographyProperty implements OnInit {
  firstText!: string;
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XTypographyPrefix);
    if (this.font) this.renderer.setStyle(this.elementRef.nativeElement, 'font-family', this.font);
    if (this.text && this.text.length > 0) this.firstText = this.text.slice(0, 1);
  }
}
