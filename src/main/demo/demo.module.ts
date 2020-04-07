import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { DemoRoutesModule } from './demo-routes.module';

@NgModule({
  imports: [DemoRoutesModule],
  declarations: [DemoComponent],
  exports: [DemoComponent]
})
export class DemoModule {}
