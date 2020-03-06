import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { ExamplesPrefix } from './examples.type';

@Component({
  selector: 'x-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XExamplesComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, ExamplesPrefix);
  }

  ngOnInit() {}
}
