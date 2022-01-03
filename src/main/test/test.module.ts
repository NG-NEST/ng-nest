import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import { TestRoutesModule } from './test-routes.module';
import { XMenuModule } from '@ng-nest/ui/menu';

@NgModule({
  imports: [TestRoutesModule, XMenuModule],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}
