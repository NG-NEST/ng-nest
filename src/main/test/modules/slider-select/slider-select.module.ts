import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XSliderSelectModule } from '@ng-nest/ui/slider-select';
import { ExDefaultComponent } from './default/default.component';
import { TeSliderSelectComponent } from './slider-select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeSliderSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XSliderSelectModule, XLayoutModule],
  declarations: [TeSliderSelectComponent, ExDefaultComponent]
})
export class TeSliderSelectModule {}
