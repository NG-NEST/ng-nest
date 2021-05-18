import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XIconModule } from '@ng-nest/ui/icon';
import { XMenuModule } from '@ng-nest/ui/menu';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDrawerModule } from '@ng-nest/ui/drawer';
import { XAffixModule } from '@ng-nest/ui/affix';
import { XI18nModule } from '@ng-nest/ui/i18n';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XSelectModule } from '@ng-nest/ui/select';
import { XSliderModule } from '@ng-nest/ui/slider';
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

const components = [
  LayoutComponent,
  HeaderComponent,
  LogoComponent,
  NavComponent,
  SiderComponent,
  ContentComponent,
  AffixComponent,
  FooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    XIconModule,
    XMenuModule,
    XButtonModule,
    XDropdownModule,
    XSelectModule,
    XDrawerModule,
    XAffixModule,
    XI18nModule,
    XLinkModule,
    XLayoutModule,
    XSliderModule,
    CdkLayoutModule,
    LayoutRoutesModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class LayoutModule {}
