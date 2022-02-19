import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTableModule } from '@ng-nest/ui/table';
import { ExCheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxService } from './checkbox/checkbox.service';
import { ExConfigComponent } from './config/config.component';
import { ConfigService } from './config/config.service';
import { TeTableComponent } from './table.component';

const routers = [{ path: '', component: TeTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), XTableModule],
  declarations: [TeTableComponent, ExConfigComponent, ExCheckboxComponent],
  providers: [ConfigService, CheckboxService]
})
export class TeTableModule {}
