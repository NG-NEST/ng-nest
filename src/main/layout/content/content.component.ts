import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'ns-content',
  templateUrl: './content.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  constructor(public ele: ElementRef, public layout: LayoutService) {}

  ngOnInit() {
    this.layout.contentRef = this.ele;
  }
}
