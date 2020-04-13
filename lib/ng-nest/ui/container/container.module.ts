import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XContainerComponent } from './container.component';
import { XFooterComponent } from './footer.component';
import { XMainComponent } from './main.component';
import { XAsideComponent } from './aside.component';
import { XHeaderComponent } from './header.component';
import { XContainerProperty, XHeaderProperty, XAsideProperty, XFooterProperty } from './container.property';

const components = [
  XContainerComponent,
  XHeaderComponent,
  XAsideComponent,
  XMainComponent,
  XFooterComponent,
  XContainerProperty,
  XHeaderProperty,
  XAsideProperty,
  XFooterProperty
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule]
})
export class XContainerModule {}
