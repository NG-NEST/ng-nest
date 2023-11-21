import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XMenuModule } from '@ng-nest/ui/menu';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDrawerModule } from '@ng-nest/ui/drawer';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { XI18nPipe } from '@ng-nest/ui/i18n';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XSelectModule } from '@ng-nest/ui/select';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { FormsModule } from '@angular/forms';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout-routes.module';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SiderComponent } from './sider/sider.component';
import { LogoComponent } from './logo/logo.component';
import { AffixComponent } from './affix/affix.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';

const components = [
  LayoutComponent,
  HeaderComponent,
  LogoComponent,
  NavComponent,
  SearchComponent,
  SiderComponent,
  ContentComponent,
  AffixComponent,
  FooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    XIconComponent,
    XMenuModule,
    XButtonComponent,
    XDropdownModule,
    XSelectModule,
    XDrawerModule,
    XAffixComponent,
    XI18nPipe,
    XLinkComponent,
    XRowComponent,
    XColComponent,
    XSliderModule,
    XAutoCompleteComponent,
    CdkLayoutModule,
    LayoutRoutesModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class LayoutModule {}
