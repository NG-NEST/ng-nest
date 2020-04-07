import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutesModule } from './news-routes.module';
import { DevelopingComponent } from 'src/share/developing/developing.component';
// import { ShareModule } from 'src/share/share.module';

@NgModule({
  imports: [CommonModule, NewsRoutesModule],
  declarations: [NewsComponent, DevelopingComponent],
  exports: [NewsComponent, DevelopingComponent]
})
export class NewsModule {}
