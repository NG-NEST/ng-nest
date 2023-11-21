import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XDrawerModule } from '@ng-nest/ui/drawer';
import { ExDefaultComponent } from './default/default.component';
import { TeDrawerComponent } from './drawer.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XRadioModule } from '@ng-nest/ui/radio';
import { ExServiceComponent } from './service/service.component';
import { ExServiceDrawerComponent } from './service/service-drawer.component';
import { ExContainerComponent } from './container/container.component';

const routers = [{ path: '', component: TeDrawerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XDrawerModule, XLayoutModule, XRadioModule, XButtonComponent],
  declarations: [TeDrawerComponent, ExDefaultComponent, ExServiceComponent, ExServiceDrawerComponent, ExContainerComponent]
})
export class TeDrawerModule {}
