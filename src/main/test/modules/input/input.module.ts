import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XInputModule } from '@ng-nest/ui/input';
import { ExDefaultComponent } from './default/default.component';
import { TeInputComponent } from './input.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, ReactiveFormsModule, XInputModule, XLayoutModule],
  declarations: [TeInputComponent, ExDefaultComponent]
})
export class TeInputModule {}
