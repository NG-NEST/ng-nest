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
import { ExLoadMoreComponent } from './load-more/load-more.component';
import { ExScrollComponent } from './scroll/scroll.component';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XButtonModule } from '@ng-nest/ui/button';
import { XInputNumberModule } from '@ng-nest/ui/input-number';
import { ExKeywordComponent } from './keyword/keyword.component';

const routers = [{ path: '', component: TeListComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    FormsModule,
    XListModule,
    XRadioModule,
    XLayoutModule,
    XButtonModule,
    XDialogModule,
    XInputNumberModule
  ],
  declarations: [TeListComponent, ExDefaultComponent, ExSizeComponent, ExLoadMoreComponent, ExScrollComponent, ExKeywordComponent]
})
export class TeListModule {}
