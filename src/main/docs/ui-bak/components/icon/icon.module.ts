import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmDocIconComponent } from "./icon.component";
import { NgMoonModule } from "ng-moon";
import { ShareModule } from "src/share/share.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: NmDocIconComponent }]),
    NgMoonModule,
    ShareModule
  ],
  declarations: [NmDocIconComponent],
  exports: [NmDocIconComponent]
})
export class NmDocIconModule {}
