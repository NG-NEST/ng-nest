import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  Renderer2,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { XTooltipPortalPrefix } from './tooltip.property';
import { XPlacement } from '@ng-nest/ui/core';

@Component({
  selector: `${XTooltipPortalPrefix}`,
  templateUrl: './tooltip-portal.component.html',
  styleUrls: ['./tooltip-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTooltipPortalComponent implements OnInit, OnDestroy, OnDestroy, AfterViewInit {
  contentChange: BehaviorSubject<any>;
  contentChange$: Subscription | null = null;
  classMap = {};
  box: DOMRect;
  arrowBox: DOMRect;
  portalHover: Function;
  viewInit: Function;
  placement: XPlacement;
  content: string;
  @ViewChild('tooltipPortal', { static: true }) tooltipPortal: ElementRef;
  @ViewChild('tooltipArrow', { static: false }) tooltipArrow: ElementRef;

  @HostListener('mouseenter') mouseenter() {
    this.portalHover(true);
  }

  @HostListener('mouseleave') mouseleave() {
    this.portalHover(false);
  }

  constructor(private renderer: Renderer2, public cdr: ChangeDetectorRef) {
    this.classMap = {
      [`${XTooltipPortalPrefix}-${this.placement}`]: true
    };
  }

  ngOnInit(): void {
    this.contentChange$ = this.contentChange.subscribe((x) => {
      this.content = x;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.viewInit();
    this.box = this.tooltipPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.tooltipArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.contentChange$?.unsubscribe();
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.box.height > this.box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'top', `${this.box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'bottom', `${this.box.height / 2 - offset}px`);
      }
    } else if (this.box.width > this.box.width && (this.includes('top-') || this.includes('bottom-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'left', `${this.box.width / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'right', `${this.box.width / 2 - offset}px`);
      }
    }
  }

  includes(arrow: string) {
    return this.placement.indexOf(arrow) >= 0;
  }
}
