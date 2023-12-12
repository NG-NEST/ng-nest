import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ns-home',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  @HostBinding('class.small') get small() {
    return this.layout.small;
  }
  @HostBinding('class.xsmall') get xsmall() {
    return this.layout.xsmall;
  }
  constructor(public layout: LayoutService) {}
}
