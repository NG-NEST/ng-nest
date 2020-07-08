import { Component, ViewEncapsulation } from '@angular/core';
import { ConfigService } from 'src/services/config.service';
import { XThemeService } from '@ng-nest/ui/core';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-nest';
  constructor(private config: ConfigService, private themeService: XThemeService) {
    this.config.init();
  }
}
