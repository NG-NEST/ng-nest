import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmAnchorComponent } from "./nm-anchor.component";
import { NmSliderModule } from '../../basic/slider/nm-slider.module';
import { NmIconModule } from '../../basic/icon/nm-icon.module';

@NgModule({
  declarations: [NmAnchorComponent],
  exports: [NmAnchorComponent],
  imports: [CommonModule, NmSliderModule, NmIconModule]
})
export class NmAnchorModule {}
