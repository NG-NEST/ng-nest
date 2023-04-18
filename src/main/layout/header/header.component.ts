import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';
import { XStorageService } from '@ng-nest/ui/core';

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

  lang = this.storage.getLocal('Lang');

  constructor(public ele: ElementRef<HTMLElement>, public layout: LayoutService, private storage: XStorageService) {}

  ngOnInit() {
    this.layout.headerRef = this.ele;
  }

  push(page: string) {
    this.storage.setLocal('Lang', page);
    location.href = `${location.origin}/${page}/${location.hash}`;
  }
}
