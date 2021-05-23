import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { XMenuNode } from '@ng-nest/ui/menu';
import { remove } from 'lodash';
import { IndexService } from '../index.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit {
  get activatedIndex() {
    return this.index.tabs ? this.index.tabs.findIndex((x) => x.routerLink === `./${this.index.session.activatedPage}`) : -1;
  }
  get showClose() {
    return this.index.tabs && this.index.tabs.length > 1 ? true : false;
  }
  constructor(public index: IndexService, private router: Router) {}

  ngOnInit(): void {}

  indexChange(index: number) {
    const tab = this.index.tabs.find((x, i) => i === index);
    if (tab && tab.routerLink) {
      let page = (tab.routerLink as string).replace(`./`, '');
      let subRoot = tab.subPage;
      let param = tab.param;
      if (subRoot) {
        page += `/${subRoot}`;
      }
      this.router.navigate([`/index/${page}`, param]);
    }
  }

  close(tab: XMenuNode) {
    let deleteIndex = 0;
    remove(this.index.tabs, (x, index) => {
      if (x.routerLink === tab.routerLink) deleteIndex = index;
      return x.routerLink === tab.routerLink;
    });
    this.index.tabs = [...this.index.tabs];
    if (tab.routerLink === `./${this.index.session.activatedPage}`) {
      let pushIndex = null;
      if (deleteIndex === 0 && this.index.tabs.length >= 1) {
        pushIndex = 0;
      }
      if (deleteIndex > 0 && this.index.tabs.length > deleteIndex) {
        pushIndex = deleteIndex;
      }
      if (deleteIndex > 0 && this.index.tabs.length <= deleteIndex) {
        pushIndex = deleteIndex - 1;
      }
      if (pushIndex !== null) {
        this.indexChange(pushIndex);
      }
    }
  }
}
