import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XThemeProperty } from './theme.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: 'x-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XThemeComponent extends XThemeProperty implements OnInit {
  constructor(public configService: XConfigService) {
    super();
  }

  ngOnInit() {}
}
