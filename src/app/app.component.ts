import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ConfigService } from '@services';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'ng-nest';
  constructor(private config: ConfigService) {}

  ngAfterViewInit(): void {
    this.config.init();
  }
}
