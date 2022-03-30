import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { XIsArray, XIsString } from '@ng-nest/ui/core';
import { XResizablePosition, XResizablePrefix, XResizableProperty } from './resizable.property';

@Directive({ selector: '[x-resizable]' })
export class XResizableDirective extends XResizableProperty implements OnInit, OnDestroy {
  document: Document;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) doc: any) {
    super();
    this.document = doc;
  }

  ngOnInit() {
    this.setMapClass();
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  ngOnDestroy() {}

  setMapClass() {
    this.renderer.addClass(this.elementRef.nativeElement, XResizablePrefix);
  }

  setPosition() {
    let positions: XResizablePosition[] = [];
    if (XIsString(this.position)) {
      positions.push(this.position as XResizablePosition);
    } else if (XIsArray(this.position)) {
      positions = this.position as XResizablePosition[];
    }

    if (positions.includes('all')) {
      this.createNode('left', 'right', 'top', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end');
    } else {
      this.createNode(...positions);
    }
  }

  createNode(...classes: XResizablePosition[]) {
    for (let cla of classes) {
      const pos = this.renderer.createElement('div');
      this.renderer.addClass(pos, `x-resizable-${cla}`);
      this.renderer.appendChild(this.elementRef.nativeElement, pos);
    }
  }
}
