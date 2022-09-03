import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XCalendarModule } from '@ng-nest/ui/calendar';
import { ExDefaultComponent } from './default/default.component';
import { TeCalendarComponent } from './calendar.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';
import { ExHeaderComponent } from './header/header.component';
import { ExCardComponent } from './card/card.component';

const routers = [{ path: '', component: TeCalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XCalendarModule, XLayoutModule],
  declarations: [TeCalendarComponent, ExDefaultComponent, ExHeaderComponent, ExCardComponent]
})
export class TeCalendarModule {}
