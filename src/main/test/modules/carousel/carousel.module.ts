import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XCarouselModule } from '@ng-nest/ui/carousel';
import { ExDefaultComponent } from './default/default.component';
import { ExCardComponent } from './card/card.component';
import { TeCarouselComponent } from './carousel.component';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { CommonModule } from '@angular/common';

const routers = [{ path: '', component: TeCarouselComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers), CommonModule, XCarouselModule, XLayoutModule],
  declarations: [TeCarouselComponent, ExDefaultComponent, ExCardComponent]
})
export class TeCarouselModule {}
