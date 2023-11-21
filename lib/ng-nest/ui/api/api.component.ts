import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnInit,
  inject
} from '@angular/core';
import { XApiPrefix } from './api.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XApiPrefix}`,
  standalone: true,
  templateUrl: './api.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XApiComponent implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef<HTMLElement>);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XApiPrefix);
  }
}
