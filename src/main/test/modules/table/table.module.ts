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
import { ExHeaderComponent } from './header/header.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { ExScrollComponent } from './scroll/scroll.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { ExFixComponent } from './fix/fix.component';
import { ExHeadComponent } from './head/head.component';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { ExEditComponent } from './edit/edit.component';
import { XSwitchModule } from '@ng-nest/ui/switch';
import { XSelectModule } from '@ng-nest/ui/select';
import { ExSearchComponent } from './search/search.component';

const routers = [{ path: '', component: TeTableComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XTableModule,
    XButtonModule,
    XIconModule,
    XDialogModule,
    XDescriptionModule,
    XLinkModule,
    XInputModule,
    XSwitchModule,
    XSelectModule
  ],
  declarations: [
    TeTableComponent,
    ExConfigComponent,
    ExCheckboxComponent,
    ExRowclassComponent,
    ExExpandComponent,
    ExAdaptionComponent,
    ExHeaderComponent,
    ExScrollComponent,
    ExFixComponent,
    ExHeadComponent,
    ExEditComponent,
    ExSearchComponent
  ],
  providers: [ConfigService, CheckboxService, RowclassService]
})
export class TeTableModule {}
