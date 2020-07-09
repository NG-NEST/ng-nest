import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XThemeProperty } from './theme.property';

@Component({
  selector: 'x-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XThemeComponent extends XThemeProperty implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
