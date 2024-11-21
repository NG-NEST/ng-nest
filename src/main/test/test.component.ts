import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ns-test',
  imports: [RouterOutlet],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent {}
