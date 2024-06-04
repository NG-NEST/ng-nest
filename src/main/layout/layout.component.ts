import { Component, OnInit, ViewEncapsulation, HostBinding, viewChild, inject } from '@angular/core';
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
  breakpointObserver = inject(BreakpointObserver);
  layout = inject(LayoutService);

  @HostBinding('class.shrink') get shrink() {
    return this.layout.shrink();
  }
  @HostBinding('class.small') get small() {
    return this.layout.small();
  }
  @HostBinding('class.xsmall') get xsmall() {
    return this.layout.xsmall();
  }
  content = viewChild.required<ContentComponent>('content');

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
      this.layout.small.set(res.breakpoints[Breakpoints.Small]);
      this.layout.xsmall.set(res.breakpoints[Breakpoints.XSmall]);
      if (!res.matches && this.layout.leftDrawerVisible()) this.layout.leftDrawerVisible.set(false);
      if (!res.matches && this.layout.rightDrawerVisible()) this.layout.rightDrawerVisible.set(false);
    });
  }
}
