import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'ns-logo',
  templateUrl: './logo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
  constructor(public layoutService: LayoutService) {}
}
