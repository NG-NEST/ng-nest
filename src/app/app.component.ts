import { Component, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-nest';
  constructor(private config: ConfigService) {
    this.config.init();
  }
}
