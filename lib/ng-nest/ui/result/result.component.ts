import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { XResultPrefix, XResultProperty } from './result.property';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XResultPrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, XOutletDirective],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XResultComponent extends XResultProperty implements OnInit {
  get strIcon() {
    return this.icon as string;
  }
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XResultPrefix}-${this.status}`] = !XIsEmpty(this.status);
  }
}
