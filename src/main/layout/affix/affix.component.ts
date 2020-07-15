import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { LayoutService } from '../layout.service';
import { XConfigService, XThemeService, X_THEME_COLORS } from '@ng-nest/ui/core';

@Component({
  selector: 'ns-affix',
  templateUrl: './affix.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AffixComponent implements OnInit {
  darkColors = {
    text: '#d1d1d1',
    border: '#474747',
    background: '#0d0d0d'
  };
  theme: 'dark' | 'light' = 'light';
  themeService: XThemeService;
  constructor(public ele: ElementRef, public layout: LayoutService, public configService: XConfigService) {
    this.themeService = this.configService.themeService;
  }

  ngOnInit() {}

  action(type: string) {
    switch (type) {
      case 'dark':
        this.theme = type;
        this.configService.setTheme({
          colors: this.themeService.getDefineColors(
            Object.assign({}, this.themeService.getColorsInProperty(X_THEME_COLORS), this.darkColors),
            '',
            true
          )
        });
        break;
      case 'light':
        this.theme = type;
        this.configService.setTheme({
          colors: this.themeService.getDefineColors(Object.assign({}, X_THEME_COLORS), '', false)
        });
        break;
    }
  }
}
