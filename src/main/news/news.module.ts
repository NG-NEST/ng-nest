import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutesModule } from './news-routes.module';
import { ShareModule } from 'src/share/share.module';

@NgModule({
  imports: [CommonModule, NewsRoutesModule, ShareModule],
  declarations: [NewsComponent],
  exports: [NewsComponent]
})
export class NewsModule {}
