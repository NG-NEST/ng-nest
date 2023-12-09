import { NgModule } from '@angular/core';
import { XContainerComponent } from './container.component';
import { XFooterComponent } from './footer.component';
import { XMainComponent } from './main.component';
import { XAsideComponent } from './aside.component';
import { XHeaderComponent } from './header.component';

@NgModule({
  imports: [XContainerComponent, XHeaderComponent, XAsideComponent, XMainComponent, XFooterComponent],
  exports: [XContainerComponent, XHeaderComponent, XAsideComponent, XMainComponent, XFooterComponent]
})
export class XContainerModule {}
