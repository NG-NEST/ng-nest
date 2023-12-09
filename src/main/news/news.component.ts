import { Component, ViewEncapsulation } from '@angular/core';
import { DevelopingComponent } from '@share/developing/developing.component';

@Component({
  selector: 'ns-news',
  standalone: true,
  imports: [DevelopingComponent],
  templateUrl: './news.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent {}
