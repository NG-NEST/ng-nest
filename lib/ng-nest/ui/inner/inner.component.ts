import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { XInnerPrefix, XInnerProperty } from './inner.property';
import { XConfigService } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XInnerPrefix}`,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inner.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInnerComponent extends XInnerProperty implements OnInit, OnChanges {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);
  private _ele: HTMLElement = this.elementRef.nativeElement;

  ngOnInit() {
    this.renderer.addClass(this._ele, XInnerPrefix);
    this.setStyle();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this._ele, 'padding', this.padding);
  }
}
