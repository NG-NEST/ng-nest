import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '@services';

@Component({
  selector: 'ns-root',
  standalone: true,
  imports: [RouterOutlet],
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
