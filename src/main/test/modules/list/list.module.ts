import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XListModule } from '@ng-nest/ui/list';
import { ExDefaultComponent } from './default/default.component';
import { TeListComponent } from './list.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExSizeComponent } from './size/size.component';
import { XRadioModule } from '@ng-nest/ui/radio';

const routers = [{ path: '', component: TeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XListModule, XRadioModule, XLayoutModule],
  declarations: [TeListComponent, ExDefaultComponent, ExSizeComponent]
})
export class TeListModule {}
