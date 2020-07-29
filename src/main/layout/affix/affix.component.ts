import { Component, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../layout.service';
import { XConfigService, X_THEME_COLORS, X_THEME_DARK_COLORS } from '@ng-nest/ui/core';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'ns-affix',
  templateUrl: './affix.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AffixComponent {
  theme: 'dark' | 'light' = 'light';
  constructor(public layout: LayoutService, public configService: XConfigService, public config: ConfigService) {}

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
      case 'zh_CN':
        this.layout.setLocale(type);
        break;
      case 'en_US':
        this.layout.setLocale(type);
        break;
    }
  }
}
