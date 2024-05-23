import { Component, OnInit, ViewEncapsulation, ElementRef, inject } from '@angular/core';
import { LayoutService } from '../layout.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ns-content',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './content.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  elementRef = inject(ElementRef);
  layout = inject(LayoutService);

  ngOnInit() {
    this.layout.contentRef.set(this.elementRef);
  }
}
