import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
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
  constructor(public ele: ElementRef<HTMLElement>, public layout: LayoutService) {}

  ngOnInit() {
    this.layout.contentRef = this.ele;
  }
}
