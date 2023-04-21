import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XSliderSelectModule } from '@ng-nest/ui/slider-select';
import { ExDefaultComponent } from './default/default.component';
import { TeSliderSelectComponent } from './slider-select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExLabelComponent } from './label/label.component';
import { ExLimitComponent } from './limit/limit.component';
import { ExPrecisionComponent } from './precision/precision.component';
import { ExReverseComponent } from './reverse/reverse.component';

const routers = [{ path: '', component: TeSliderSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XSliderSelectModule, XLayoutModule],
  declarations: [
    TeSliderSelectComponent,
    ExDefaultComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExLimitComponent,
    ExPrecisionComponent,
    ExReverseComponent
  ]
})
export class TeSliderSelectModule {}
