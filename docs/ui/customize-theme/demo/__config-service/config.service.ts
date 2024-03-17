import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { XConfigService, X_THEME_COLORS, X_THEME_DARK_COLORS } from '@ng-nest/ui/core';

@Component({
  selector: 'ns-affix',
  templateUrl: './affix.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AffixComponent implements OnInit {
  theme: 'dark' | 'light' = 'light';
  constructor(public configService: XConfigService) {}

  ngOnInit() {}

  action(type: string) {
    switch (type) {
      case 'dark':
        this.theme = type;
        this.configService.setDarkTheme({ colors: X_THEME_DARK_COLORS });
        break;
      case 'light':
        this.theme = type;
        this.configService.setLightTheme({ colors: X_THEME_COLORS });
        break;
    }
  }
}

......

// 系统默认
export const X_THEME_COLORS: XColorsTheme = {
  primary: '#3B82F6',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  text: '#333333',
  border: '#dcdfe6',
  background: '#f6f6f6'
};
  
// 暗黑风格
export const X_THEME_DARK_COLORS: XColorsTheme = {
  text: '#dddddd',
  border: '#333333',
  background: '#000000'
};