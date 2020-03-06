import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  Renderer2,
  HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';
import { XPopoverPortal, XPopoverPortalPrefix } from './popover.type';

@Component({
  selector: 'x-popover-portal',
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
  @ViewChild('popoverPortal', { static: true }) popoverPortal: ElementRef;
  @ViewChild('popoverArrow', { static: false }) popoverArrow: ElementRef;

  @HostListener('mouseenter') mouseenter() {
    if (this.option.trigger === 'hover') {
      this.option.portalHover(true);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.option.trigger === 'hover') {
      this.option.portalHover(false);
    }
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(XPopoverPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    this.classMap = {
      [`${XPopoverPortalPrefix}-${this.option.placement}`]: true
    };
  }

  ngOnInit(): void {
    this.contentChange$ = this.option.contentChange.subscribe(x => {
      this.option.content = x;
      this.cdr.detectChanges();
    });
    if (this.option.trigger === 'click') {
      setTimeout(
        () =>
          (this.docClickFunction = this.renderer.listen('document', 'click', () => {
            this.option.closePortal();
          }))
      );
    }
    // removeNgTag(this.elementRef.nativeElement);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  ngAfterViewInit() {
    this.option.viewInit();
    this.box = this.popoverPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.popoverArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.cdr.detectChanges();
  }

  ngAfterContentInit() {}

  ngOnDestroy(): void {
    this.contentChange$ && this.contentChange$.unsubscribe();
    this.docClickFunction && this.docClickFunction();
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.box.height > this.option.box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'top', `${this.option.box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'bottom', `${this.option.box.height / 2 - offset}px`);
      }
    } else if (this.box.width > this.option.box.width && (this.includes('top-') || this.includes('bottom-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'left', `${this.option.box.width / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'right', `${this.option.box.width / 2 - offset}px`);
      }
    }
  }

  includes(arrow) {
    return this.option.placement.indexOf(arrow) >= 0;
  }
}
