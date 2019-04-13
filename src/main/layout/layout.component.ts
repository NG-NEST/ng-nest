import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { LayoutService } from './layout.service';

@Component({
  selector: 'ns-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  @HostBinding('class.shrink') get shrink() { return this.layoutService.shrink; }

  constructor(
    private mediaMatcher: MediaMatcher,
    private layoutService: LayoutService
    ) { }

  toXSmall: MediaQueryList;

  ngOnInit() {
    this.toXSmall = this.mediaMatcher.matchMedia(Breakpoints.XSmall);
    this.toXSmall.addListener(this.toXSmallListener)
  }

  toXSmallListener(event: MediaQueryListEvent) {
    console.log(event.matches ? 'match' : 'no match')
  }

}
