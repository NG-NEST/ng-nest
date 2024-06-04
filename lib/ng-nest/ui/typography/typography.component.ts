import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject,
  signal
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
  firstText = signal('');
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XTypographyPrefix);
    const font = this.font();
    const text = this.text();
    if (font) this.renderer.setStyle(this.elementRef.nativeElement, 'font-family', font);
    if (text && text.length > 0) this.firstText.set(text.slice(0, 1));
  }
}
