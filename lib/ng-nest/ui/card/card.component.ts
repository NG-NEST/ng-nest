import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { XCardPrefix, XCardProperty } from './card.property';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: `${XCardPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, XIconComponent, XOutletDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent extends XCardProperty implements OnInit {
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XCardPrefix}-${this.shadow}`] = !XIsEmpty(this.shadow);
  }
}
