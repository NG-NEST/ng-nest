import { Component } from '@angular/core';
import { XSize } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ExScrollComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';

  visible = false;

  scrollHeight = 250;
  data = Array.from({ length: 1000 }).map((_, index) => `item ${index + 1}`);
}
