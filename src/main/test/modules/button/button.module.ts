import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExDefaultComponent } from './default/default.component';
import { TeButtonComponent } from './button.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XButtonModule } from '@ng-nest/ui/button';
import { CommonModule } from '@angular/common';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExGroupComponent } from './group/group.component';
import { ExIconComponent } from './icon/icon.component';
import { ExLoadingComponent } from './loading/loading.component';
import { ExSizeComponent } from './size/size.component';
import { ExTextComponent } from './text/text.component';
import { XIconModule } from '@ng-nest/ui/icon';

const routers = [{ path: '', component: TeButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XButtonModule, XLayoutModule, XIconModule],
  declarations: [
    TeButtonComponent,
    ExDefaultComponent,
    ExDisabledComponent,
    ExGroupComponent,
    ExIconComponent,
    ExLoadingComponent,
    ExSizeComponent,
    ExTextComponent
  ]
})
export class TeButtonModule {}
