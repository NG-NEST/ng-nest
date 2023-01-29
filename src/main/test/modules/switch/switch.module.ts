import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { ExDefaultComponent } from './default/default.component';
import { TeSwitchComponent } from './switch.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExLabelComponent } from './label/label.component';
import { ExLoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeSwitchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XSwitchModule, XLayoutModule],
  declarations: [TeSwitchComponent, ExDefaultComponent, ExDisabledComponent, ExLabelComponent, ExLoadingComponent]
})
export class TeSwitchModule {}
