import { Component, OnInit, ViewEncapsulation, HostBinding, ViewChild } from '@angular/core';
import { MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { LayoutService } from './layout.service';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'ns-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  @HostBinding('class.shrink') get shrink() {
    return this.layoutService.shrink;
  }
  @ViewChild('content', { static: true }) content: ContentComponent;

  constructor(
    private mediaMatcher: MediaMatcher,
    private layoutService: LayoutService,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  toXSmall: MediaQueryList;

  ngOnInit() {
    this.toXSmall = this.mediaMatcher.matchMedia(Breakpoints.XSmall);
    this.toXSmall.addListener(this.toXSmallListener);
    this.scrollDispatcher.scrolled().subscribe((scrollable: CdkScrollable) => {
      if (scrollable) {
        const scrollRef = scrollable.getElementRef();
        if (scrollRef.nativeElement.tagName === 'NS-CONTENT') {
          this.layoutService.contentScrolling.next(scrollable);
        }
      }
    });
  }

  toXSmallListener(event: MediaQueryListEvent) {}
}
