import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XIconModule } from '@ng-nest/ui/icon';
import { XMenuModule } from '@ng-nest/ui/menu';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDrawerModule } from '@ng-nest/ui/drawer';
import { XAffixModule } from '@ng-nest/ui/affix';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout-routes.module';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SiderComponent } from './sider/sider.component';
import { LogoComponent } from './logo/logo.component';
import { AffixComponent } from './affix/affix.component';

const components = [LayoutComponent, HeaderComponent, LogoComponent, SiderComponent, ContentComponent, AffixComponent, FooterComponent];

@NgModule({
  imports: [
    CommonModule,
    XIconModule,
    XMenuModule,
    XButtonModule,
    XDropdownModule,
    XDrawerModule,
    XAffixModule,
    CdkLayoutModule,
    LayoutRoutesModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class LayoutModule {}
