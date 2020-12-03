import { Component, ViewEncapsulation } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'ns-logo',
  templateUrl: './logo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
  versions = [];
  constructor(public layoutService: LayoutService, public config: ConfigService) {}
}
