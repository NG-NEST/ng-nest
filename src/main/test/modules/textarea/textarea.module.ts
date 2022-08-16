import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { ExDefaultComponent } from './default/default.component';
import { TeTextareaComponent } from './textarea.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExClearComponent } from './clear/clear.component';
import { FormsModule } from '@angular/forms';

const routers = [{ path: '', component: TeTextareaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XTextareaModule, XLayoutModule],
  declarations: [TeTextareaComponent, ExDefaultComponent, ExClearComponent]
})
export class TeTextareaModule {}
