import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  SimpleChanges,
  inject
} from '@angular/core';
import { XContainerPrefix, XContainerProperty } from './container.property';
import { XConfigService } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XContainerPrefix}`,
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XContainerComponent extends XContainerProperty implements OnInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XContainerPrefix);
    this.setDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { direction } = changes;
    if (direction && direction.currentValue != direction.previousValue) {
      this.setDirection();
    }
  }

  setDirection() {
    if (this.direction) {
      this.renderer.addClass(this.elementRef.nativeElement, `x-direction-${this.direction}`);
    }
  }
}
