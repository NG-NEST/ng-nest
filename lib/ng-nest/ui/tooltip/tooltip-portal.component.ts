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
  AfterViewInit,
  HostBinding,
  inject
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { XTooltipPortalPrefix } from './tooltip.property';
import { XPlacement, XClassMap, XFadeAnimation, XTemplate } from '@ng-nest/ui/core';
import { takeUntil } from 'rxjs/operators';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XTooltipPortalPrefix}`,
  standalone: true,
  imports: [NgClass, XOutletDirective],
  templateUrl: './tooltip-portal.component.html',
  styleUrls: ['./tooltip-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XTooltipPortalComponent implements OnInit, OnDestroy, OnDestroy, AfterViewInit {
  @HostListener('mouseenter') mouseenter() {
    this.portalHover(true);
  }
  @HostListener('mouseleave') mouseleave() {
    this.portalHover(false);
  }

  @HostBinding('@x-fade-animation') animation: any;

  @ViewChild('tooltipPortal', { static: true }) tooltipPortal!: ElementRef<HTMLElement>;
  @ViewChild('tooltipArrow') tooltipArrow!: ElementRef<HTMLElement>;
  @ViewChild('tooltipArrowAfter') tooltipArrowAfter!: ElementRef<HTMLElement>;

  contentChange!: BehaviorSubject<any>;
  classMap: XClassMap = {};
  box!: DOMRect;
  portalBox!: DOMRect;
  arrowBox!: DOMRect;
  portalHover!: Function;
  viewInit!: Function;
  destroy!: Function;
  placement!: XPlacement;
  previousPlacement!: XPlacement;
  content!: XTemplate;
  color!: string;
  backgroundColor!: string;
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

  ngAfterViewInit() {
    this.viewInit();
    this.portalBox = this.tooltipPortal.nativeElement.getBoundingClientRect();
    this.arrowBox = this.tooltipArrow.nativeElement.getBoundingClientRect();
    this.setArrow();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  setClassMap() {
    this.classMap[`${XTooltipPortalPrefix}-${this.previousPlacement}`] = false;
    this.classMap[`${XTooltipPortalPrefix}-${this.placement}`] = true;
    this.previousPlacement = `${this.placement}` as XPlacement;
  }

  setArrow() {
    let offset = this.arrowBox.height / 2;
    if (this.portalBox.height > this.box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'top', `${this.box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'bottom', `${this.box.height / 2 - offset}px`);
      }
    } else if (this.portalBox.width > this.box.width && (this.includes('top-') || this.includes('bottom-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'left', `${this.box.width / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(this.tooltipArrow.nativeElement, 'right', `${this.box.width / 2 - offset}px`);
      }
    }
    if (!this.backgroundColor) return;
    const ptSplit = this.placement.split('-');
    if (ptSplit.length > 0) {
      this.renderer.setStyle(this.tooltipArrow.nativeElement, `border-${ptSplit[0]}-color`, this.backgroundColor);
      this.renderer.setStyle(this.tooltipArrowAfter.nativeElement, `border-${ptSplit[0]}-color`, this.backgroundColor);
    }
  }

  includes(arrow: string) {
    return this.placement.indexOf(arrow) >= 0;
  }
}
