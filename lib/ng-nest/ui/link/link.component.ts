import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild
} from '@angular/core';
import { XLinkPrefix, XLinkProperty } from './link.property';
import { XConfigService, XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XLinkPrefix}`,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLinkComponent extends XLinkProperty implements OnInit, AfterViewInit {
  hover: boolean = false;

  @ViewChild('link', { static: true }) link!: ElementRef<HTMLLinkElement>;

  @HostListener('mouseenter') mouseenter() {
    this.hover = true;
    this.cdr.detectChanges();
  }

  @HostListener('mouseleave') mouseleave() {
    this.hover = false;
    this.cdr.detectChanges();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngAfterViewInit() {
    if (XIsEmpty(this.href)) {
      this.renderer.removeAttribute(this.link?.nativeElement, 'href');
    }
  }

  onClick(event: Event) {
    if (this.preventDefault) {
      event.preventDefault();
    }
  }

  setClassMap() {
    this.classMap[`${XLinkPrefix}-${this.type}`] = this.type ? true : false;
  }
}
