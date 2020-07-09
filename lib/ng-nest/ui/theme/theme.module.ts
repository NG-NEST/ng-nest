import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XThemeComponent } from './theme.component';
import { XThemeProperty } from './theme.property';

@NgModule({
  declarations: [XThemeComponent, XThemeProperty],
  exports: [XThemeComponent],
  imports: [CommonModule]
})
export class XThemeModule {}
