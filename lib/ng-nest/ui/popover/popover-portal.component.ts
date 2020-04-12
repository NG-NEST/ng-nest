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
  HostListener
} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { XPopoverPortalPrefix, XPopoverTrigger } from './popover.property';
import { XTemplate, XPlacement } from '@ng-nest/ui/core';

@Component({
  selector: `${XPopoverPortalPrefix}`,
  templateUrl: './popover-portal.component.html',
  styleUrls: ['./popover-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopoverPortalComponent implements OnInit, OnDestroy {
  contentChange$: Subscription | null = null;
  classMap = {};
  box: DOMRect;
  arrowBox: DOMRect;
  docClickFunction: Function;
  title: XTemplate;
  content: XTemplate;
  footer: XTemplate;
  contentChange: BehaviorSubject<any>;
  trigger: XPopoverTrigger;
  placement: XPlacement;
  portalHover: Function;
  closePortal: Function;
  viewInit: Function;
  @ViewChild('popoverPortal', { static: true }) popoverPortal: ElementRef;
  @ViewChild('popoverArrow', { static: false }) popoverArrow: ElementRef;

  @HostListener('mouseenter') mouseenter() {
    if (this.trigger === 'hover') {
      this.portalHover(true);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.trigger === 'hover') {
      this.portalHover(false);
    }
  }

  constructor(private renderer: Renderer2, public cdr: ChangeDetectorRef) {
    this.classMap = {
      [`${XPopoverPortalPrefix}-${this.placement}`]: true
    };
  }

  ngOnInit(): void {
    this.contentChange$ = this.contentChange.subscribe((x) => {
      this.content = x;
      this.cdr.detectChanges();
    });
    if (this.trigger === 'click') {
      setTimeout(
        () =>
          (this.docClickFunction = this.renderer.listen('document', 'click', () => {
            this.closePortal();
          }))
      );
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  ngAfterViewInit() {
    this.viewInit();
    this.box = this.popoverPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.popoverArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.cdr.detectChanges();
  }

  ngAfterContentInit() {}

  ngOnDestroy(): void {
    this.contentChange$?.unsubscribe();
    this.docClickFunction?.();
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.box.height > this.box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'top', `${this.box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'bottom', `${this.box.height / 2 - offset}px`);
      }
    } else if (this.box.width > this.box.width && (this.includes('top-') || this.includes('bottom-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'left', `${this.box.width / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'right', `${this.box.width / 2 - offset}px`);
      }
    }
  }

  includes(arrow: string) {
    return this.placement.indexOf(arrow) >= 0;
  }
}
