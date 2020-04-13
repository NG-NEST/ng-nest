import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XIconComponent } from './icon.component';
import { HttpClientModule } from '@angular/common/http';
import { XIconService } from './icon.service';
import { XIconProperty } from './icon.property';

@NgModule({
  declarations: [XIconComponent, XIconProperty],
  exports: [XIconComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [XIconService]
})
export class XIconModule {}
