import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmIconComponent } from "./nm-icon.component";
import { NmIconService } from "./nm-icon.service";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NmIconComponent],
  exports: [NmIconComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [NmIconService]
})
export class NmIconModule {}
