import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Input,
  inject,
  OnInit
} from '@angular/core';
import { XMenuNodeProperty, XMenuNodePrefix } from './menu.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XIconComponent } from '../icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: `${XMenuNodePrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, RouterModule],
  templateUrl: './menu-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuNodeComponent extends XMenuNodeProperty implements OnInit {
  @Input() menu: any;
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    if (this.menu?.activatedId == this.node.id) {
      this.menu.activatedElementRef = this.elementRef;
    }
    this.node.change = () => {
      this.cdr.detectChanges();
    };
  }
}
