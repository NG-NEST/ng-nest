import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {}

  push(page: string) {
    localStorage.setItem('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }
}
