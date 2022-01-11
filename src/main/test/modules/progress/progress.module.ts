import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XProgressModule } from '@ng-nest/ui/progress';
import { ExDefaultComponent } from './default/default.component';
import { TeProgressComponent } from './progress.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExGradientComponent } from './gradient/gradient.component';
import { ExStepsComponent } from './steps/steps.component';

const routers = [{ path: '', component: TeProgressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XProgressModule, XLayoutModule],
  declarations: [TeProgressComponent, ExDefaultComponent, ExGradientComponent, ExStepsComponent]
})
export class TeProgressModule {}
