import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnInit,
  inject
} from '@angular/core';
import { XBorderPrefix } from './border.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: 'x-border',
  standalone: true,
  template: '',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBorderComponent implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XBorderPrefix);
  }
}
