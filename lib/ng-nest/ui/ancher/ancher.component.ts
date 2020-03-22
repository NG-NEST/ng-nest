import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Input,
  ViewChild,
  AfterContentChecked,
  AfterViewChecked
} from '@angular/core';
import { XAncherPrefix, XAncherNode } from './ancher.type';
import { XClassMap, computedStyle, XIsEmpty } from '@ng-nest/ui/core';
import { XSliderNode, XSliderBorderPositionType, XActivatedSlider } from '@ng-nest/ui/slider';

@Component({
  selector: `${XAncherPrefix}`,
  templateUrl: './ancher.component.html',
  styleUrls: ['./ancher.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAncherComponent implements OnInit, OnChanges {
  @Input() scroll?: HTMLElement;
  @Input('affix-top') affixTop?: string = '0';
  @ViewChild('content', { static: true }) content: ElementRef;
  classMap: XClassMap = {};
  hElements: HTMLElement[] = [];
  sliderData: XSliderNode[] = [];
  borderPosition: XSliderBorderPositionType = 'left';
  activatedIndex: number = 0;
  sliderHeight?: number;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
    this.setSliderData();
    this.setHeight();
  }

  ngOnChanges(simple: SimpleChanges) {}

  activatedChange(activated: XActivatedSlider) {
    if (XIsEmpty(this.hElements) || XIsEmpty(this.scroll)) return;
    let hElement = this.hElements[activated.activatedIndex];
    console.log(hElement.offsetTop);
    console.log(this.scroll.offsetTop);
  }

  setClassMap() {
    // this.classMap[`${XAncherPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }

  private setScrollTop() {}

  private setSliderData() {
    let hElements = this.content.nativeElement.querySelectorAll(':scope> h1,:scope> h2,:scope> h3,:scope> h4,:scope> h5');
    if (hElements.length > 0) {
      let list: XAncherNode[] = [];
      hElements.forEach((x: HTMLElement, i: number) => {
        const link = `x-anchor-${i}`;
        const left = this.setLeft(x);
        this.renderer.setAttribute(x, 'id', link);
        list = [
          ...list,
          {
            id: i,
            label: x.innerText,
            left: left,
            link: link
          }
        ];
      });
      this.sliderData = list;
    }
  }

  private setLeft(element: HTMLElement): number {
    const eles = ['H1', 'H2', 'H3', 'H4', 'H5'];
    const index = eles.indexOf(element.tagName);
    return index + 1;
  }

  private setHeight() {
    if (this.scroll) {
      let height = this.scroll.offsetHeight;
      let top = parseFloat(computedStyle(this.scroll, 'padding-top'));
      let borderTop = parseFloat(computedStyle(this.scroll, 'border-top'));
      let bottom = parseFloat(computedStyle(this.scroll, 'padding-bottom'));
      let borderBottom = parseFloat(computedStyle(this.scroll, 'border-bottom'));
      this.sliderHeight = height - top - bottom - borderTop - borderBottom;
    }
  }
}
