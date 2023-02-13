import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeFileModule } from '@ng-nest/ui/tree-file';
import { ExDefaultComponent } from './default/default.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';
import { TeTreeFileComponent } from './tree-file.component';

const routers = [{ path: '', component: TeTreeFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XTreeFileModule, XRadioModule, XLayoutModule, XInputModule],
  declarations: [
    TeTreeFileComponent,
    ExDefaultComponent
  ]
})
export class TeTreeFileModule {}
