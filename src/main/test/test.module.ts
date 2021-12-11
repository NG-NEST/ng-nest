import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import { TestRoutesModule } from './test-routes.module';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';

@NgModule({
  imports: [TestRoutesModule, XDatePickerModule],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}
