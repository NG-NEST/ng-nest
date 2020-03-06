import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutesModule } from './demo-routes.module';

@NgModule({
  imports: [CommonModule, DemoRoutesModule],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
