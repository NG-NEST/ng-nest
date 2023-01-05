import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XPaginationModule } from '@ng-nest/ui/pagination';
import { ExDefaultComponent } from './default/default.component';
import { TePaginationComponent } from './pagination.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExStyleComponent } from './style/style.component';

const routers = [{ path: '', component: TePaginationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XPaginationModule, XLayoutModule],
  declarations: [TePaginationComponent, ExDefaultComponent, ExStyleComponent]
})
export class TePaginationModule {}
