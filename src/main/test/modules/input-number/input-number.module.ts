import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XInputNumberModule } from '@ng-nest/ui/input-number';
import { ExDefaultComponent } from './default/default.component';
import { TeInputNumberComponent } from './input-number.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ExFormatComponent } from './format/format.component';
import { ExBorderedComponent } from './bordered/bordered.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExLabelComponent } from './label/label.component';
import { ExLimitComponent } from './limit/limit.component';
import { ExPrecisionComponent } from './precision/precision.component';
import { ExRequiredComponent } from './required/required.component';
import { ExSizeComponent } from './size/size.component';
import { XRadioModule } from '@ng-nest/ui/radio';

const routers = [{ path: '', component: TeInputNumberComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XInputNumberModule,
    XLayoutModule,
    XButtonComponent,
    XRadioModule
  ],
  declarations: [
    TeInputNumberComponent,
    ExDefaultComponent,
    ExFormatComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExLimitComponent,
    ExPrecisionComponent,
    ExRequiredComponent,
    ExSizeComponent
  ]
})
export class TeInputNumberModule {}
