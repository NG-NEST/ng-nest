import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { TeColorPickerComponent } from './color-picker.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExDefaultComponent } from './default/default.component';
import { ExBorderedComponent } from './bordered/bordered.component';
import { ExSizeComponent } from './size/size.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExLabelComponent } from './label/label.component';
import { ExRequiredComponent } from './required/required.component';
import { FormsModule } from '@angular/forms';
import { XRadioModule } from '@ng-nest/ui/radio';

const routers = [{ path: '', component: TeColorPickerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XRadioModule, XColorPickerModule, XLayoutModule],
  declarations: [
    TeColorPickerComponent,
    ExDefaultComponent,
    ExBorderedComponent,
    ExSizeComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExRequiredComponent
  ]
})
export class TeColorPickerModule {}
