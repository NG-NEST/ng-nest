import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'ns-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  list = [
    { name: 'Home', page: './home' },
    { name: 'Demo', page: './demo' },
    { name: 'Docs', page: './docs' },
    { name: 'News', page: './news' }
  ];

  lang = localStorage.getItem('Lang');

  constructor(public ele: ElementRef, public layout: LayoutService) {}

  ngOnInit() {
    this.layout.headerRef = this.ele;
  }

  push(page: string) {
    localStorage.setItem('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }
}
