import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XTreeSelectModule } from '@ng-nest/ui/tree-select';
import { ExDefaultComponent } from './default/default.component';
import { TeTreeSelectComponent } from './tree-select.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { XRadioModule } from '@ng-nest/ui/radio';
import { ExLabelComponent } from './label/label.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExRequiredComponent } from './required/required.component';
import { ExBorderedComponent } from './bordered/bordered.component';
import { ExMultipleComponent } from './multiple/multiple.component';
import { ExScrollComponent } from './scroll/scroll.component';
import { ExAsyncComponent } from './async/async.component';
import { ExCustomComponent } from './custom/custom.component';
import { ExSizeComponent } from './size/size.component';
import { ExSearchComponent } from './search/search.component';
import { ExPathComponent } from './path/path.component';
import { ExLeafComponent } from './leaf/leaf.component';

const routers = [{ path: '', component: TeTreeSelectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, FormsModule, XTreeSelectModule, XRadioModule, XLayoutModule, XInputModule],
  declarations: [
    TeTreeSelectComponent,
    ExDefaultComponent,
    ExPathComponent,
    ExLabelComponent,
    ExDisabledComponent,
    ExRequiredComponent,
    ExBorderedComponent,
    ExMultipleComponent,
    ExScrollComponent,
    ExAsyncComponent,
    ExCustomComponent,
    ExSizeComponent,
    ExSearchComponent,
    ExLeafComponent
  ]
})
export class TeTreeSelectModule {}
