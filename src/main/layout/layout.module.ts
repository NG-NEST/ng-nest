import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout-routes.module';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { SiderComponent } from './sider/sider.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XMenuModule } from '@ng-nest/ui/menu';

const components = [LayoutComponent, HeaderComponent, SiderComponent, ContentComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, XIconModule, XMenuModule, LayoutRoutesModule],
  declarations: [...components],
  exports: [...components]
})
export class LayoutModule {}
