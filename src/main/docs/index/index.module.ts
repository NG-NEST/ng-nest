import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutesModule } from './index-routes.module';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    IndexRoutesModule
  ],
  declarations: [IndexComponent],
  exports: [IndexComponent]
})
export class IndexModule { }
