import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NmDocInputComponent } from "./input.component";
import { NgMoonModule } from "ng-moon";
import { ShareModule } from "src/share/share.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: NmDocInputComponent }]),
    NgMoonModule,
    ShareModule
  ],
  declarations: [NmDocInputComponent],
  exports: [NmDocInputComponent]
})
export class NmDocInputModule {}
