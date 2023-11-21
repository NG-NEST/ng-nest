import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XRateModule } from '@ng-nest/ui/rate';
import { ExDefaultComponent } from './default/default.component';
import { ExColorComponent } from './color/color.component';
import { TeRateComponent } from './rate.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';

const routers = [{ path: '', component: TeRateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XRateModule, XIconComponent, XLayoutModule],
  declarations: [TeRateComponent, ExDefaultComponent, ExColorComponent]
})
export class TeRateModule {}
