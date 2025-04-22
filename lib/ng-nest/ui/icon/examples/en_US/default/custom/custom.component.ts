import { Component } from '@angular/core';
import { XIconComponent, XIconService } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-custom',
  imports: [XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  constructor(private icon: XIconService) {
    this.icon.register('my-home', '/svg/home.svg');
    this.icon.register('my-car', '/svg/car.svg');
    this.icon.register('jk-weather', '/svg/weather.svg');
  }
}
