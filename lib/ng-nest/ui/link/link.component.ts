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
  ViewChild,
  inject
} from '@angular/core';
import { XLinkPrefix, XLinkProperty } from './link.property';
import { XConfigService, XIsEmpty } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XLinkPrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent],
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

  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

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
