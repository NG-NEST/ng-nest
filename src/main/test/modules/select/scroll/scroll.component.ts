import { Component } from '@angular/core';

@Component({
  selector: 'ex-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ExScrollComponent {
  data = Array.from({ length: 1000 }).map((_, i) => `${i + 1}${i + 1}`);
}
