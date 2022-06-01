import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTableModule } from '@ng-nest/ui/table';
import { ExCheckboxComponent } from './checkbox/checkbox.component';
import { ExRowclassComponent } from './rowclass/rowclass.component';
import { CheckboxService } from './checkbox/checkbox.service';
import { ExConfigComponent } from './config/config.component';
import { ConfigService } from './config/config.service';
import { RowclassService } from './rowclass/rowclass.service';
import { TeTableComponent } from './table.component';
import { ExExpandComponent } from './expand/expand.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { ExAdaptionComponent } from './adaption/adaption.component';
import { CommonModule } from '@angular/common';
import { XDescriptionModule } from '@ng-nest/ui/description';

const routers = [{ path: '', component: TeTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XTableModule, XButtonModule, XDialogModule, XDescriptionModule],
  declarations: [TeTableComponent, ExConfigComponent, ExCheckboxComponent, ExRowclassComponent, ExExpandComponent, ExAdaptionComponent],
  providers: [ConfigService, CheckboxService, RowclassService]
})
export class TeTableModule {}
