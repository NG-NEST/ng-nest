import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  lang: string = localStorage.getItem('Lang');

  constructor() {}

  ngOnInit() {}

  push(page) {
    localStorage.setItem('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }
}
