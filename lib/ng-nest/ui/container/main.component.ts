import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject,
  OnInit
} from '@angular/core';
import { XMainPrefix } from './container.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XMainPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMainComponent implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XMainPrefix);
  }
}
