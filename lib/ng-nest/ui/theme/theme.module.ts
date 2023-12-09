import { NgModule } from '@angular/core';
import { XThemeComponent } from './theme.component';

@NgModule({
  exports: [XThemeComponent],
  imports: [XThemeComponent]
})
export class XThemeModule {}
