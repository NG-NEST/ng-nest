import { Component, OnInit, ViewEncapsulation, HostBinding, viewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LayoutService } from './layout.service';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'ns-layout',
  standalone: true,
  imports: [HeaderComponent, ContentComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  @HostBinding('class.shrink') get shrink() {
    return this.layoutService.shrink;
  }
  @HostBinding('class.small') get small() {
    return this.layoutService.small;
  }
  @HostBinding('class.xsmall') get xsmall() {
    return this.layoutService.xsmall;
  }
  content = viewChild.required<ContentComponent>('content');

  constructor(
    private breakpointObserver: BreakpointObserver,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    // // 手持设备
    // let Handset = Breakpoints.Handset;
    // // 手持landscape屏
    // let HandsetLandscape = Breakpoints.HandsetLandscape;
    // //手持portrait屏
    // let HandsetPortrait = Breakpoints.HandsetPortrait;
    // // 多媒体
    // let Medium = Breakpoints.Medium;
    // // 平板电脑
    // let Tablet = Breakpoints.Tablet;
    // // 平板电脑 Landscape
    // let TabletLandscape = Breakpoints.TabletLandscape;
    // // 平板电脑 Portrait
    // let TabletPortrait = Breakpoints.TabletPortrait;
    // // web
    // let Web = Breakpoints.Web;
    // // web landscape
    // let WebLandscape = Breakpoints.WebLandscape;
    // // web portrait
    // let WebPortrait = Breakpoints.WebPortrait;
    // // 大屏幕
    // let Large = Breakpoints.Large;
    // // 更大屏幕
    // let XLarge = Breakpoints.XLarge;
    // // 更小屏幕
    // let XSmall = Breakpoints.XSmall;
    // // 小屏幕
    // let Small = Breakpoints.Small;

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((res) => {
      this.layoutService.small = res.breakpoints[Breakpoints.Small];
      this.layoutService.xsmall = res.breakpoints[Breakpoints.XSmall];
      if (!res.matches && this.layoutService.leftDrawerVisible) this.layoutService.leftDrawerVisible = false;
      if (!res.matches && this.layoutService.rightDrawerVisible) this.layoutService.rightDrawerVisible = false;
    });
    this.breakpointObserver;
  }
}
