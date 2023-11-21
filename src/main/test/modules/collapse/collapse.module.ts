import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XCollapseModule } from '@ng-nest/ui/collapse';
import { ExDefaultComponent } from './default/default.component';
import { TeCollapseComponent } from './collapse.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExIconComponent } from './icon/icon.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { ExGhostComponent } from './ghost/ghost.component';
import { ExArrowComponent } from './arrow/arrow.component';
import { ExBorderComponent } from './border/border.component';
import { ExDisabledComponent } from './disabled/disabled.component';

const routers = [{ path: '', component: TeCollapseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XCollapseModule, XLayoutModule, XIconComponent],
  declarations: [
    TeCollapseComponent,
    ExDefaultComponent,
    ExIconComponent,
    ExGhostComponent,
    ExArrowComponent,
    ExBorderComponent,
    ExDisabledComponent
  ]
})
export class TeCollapseModule {}
