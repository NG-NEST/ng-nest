import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XCalendarModule } from '@ng-nest/ui/calendar';
import { ExDefaultComponent } from './default/default.component';
import { TeCalendarComponent } from './calendar.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeCalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XCalendarModule, XLayoutModule],
  declarations: [TeCalendarComponent, ExDefaultComponent]
})
export class TeCalendarModule {}
