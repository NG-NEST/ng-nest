import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { XPageHeaderPrefix } from './page-header.type';

@Component({
  selector: `${XPageHeaderPrefix}`,
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPageHeaderComponent {
  @Input('back-icon') backIcon: string = 'fto-arrow-left';
  @Input('back-text') backText: string = '返回';
  @Input() title: string;
  @Input('sub-title') subTitle: string;
  @Output() backClick = new EventEmitter();
}
