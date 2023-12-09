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
  HostBinding,
  inject
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { XPopoverPortalPrefix, XPopoverTrigger } from './popover.property';
import { XTemplate, XPlacement, XClassMap, XFadeAnimation } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XPopoverPortalPrefix}`,
  standalone: true,
  imports: [CommonModule, XOutletDirective],
  templateUrl: './popover-portal.component.html',
  styleUrls: ['./popover-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XPopoverPortalComponent implements OnInit, OnDestroy {
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

  @HostBinding('@x-fade-animation') animation: any;

  @ViewChild('popoverPortal', { static: true }) popoverPortal!: ElementRef<HTMLElement>;
  @ViewChild('popoverArrow', { static: true }) popoverArrow!: ElementRef<HTMLElement>;

  classMap: XClassMap = {};
  box!: DOMRect;
  portalBox!: DOMRect;
  arrowBox!: DOMRect;
  // docClickFunction: Function;
  title!: XTemplate;
  content!: XTemplate;
  footer!: XTemplate;
  contentChange!: BehaviorSubject<any>;
  trigger!: XPopoverTrigger;
  placement!: XPlacement;
  previousPlacement!: XPlacement;
  portalHover!: Function;
  closePortal!: Function;
  viewInit!: Function;
  width!: string;
  positionChange: Subject<any> = new Subject();
  private _unSubject = new Subject<void>();
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.contentChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.content = x;
      this.cdr.detectChanges();
    });
    this.positionChange.pipe(takeUntil(this._unSubject)).subscribe((x) => {
      this.placement = x;
      this.setClassMap();
      setTimeout(() => this.setArrow());
      this.cdr.detectChanges();
    });
    this.setClassMap();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  ngAfterViewInit() {
    this.viewInit();
    this.portalBox = this.popoverPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.popoverArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    this.classMap[`${XPopoverPortalPrefix}-${this.previousPlacement}`] = false;
    this.classMap[`${XPopoverPortalPrefix}-${this.placement}`] = true;
    this.previousPlacement = `${this.placement}` as XPlacement;
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.portalBox.height > this.box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'top', `${this.box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.popoverArrow.nativeElement, 'bottom', `${this.box.height / 2 - offset}px`);
      }
    } else if (this.portalBox.width > this.box.width && (this.includes('top-') || this.includes('bottom-'))) {
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
