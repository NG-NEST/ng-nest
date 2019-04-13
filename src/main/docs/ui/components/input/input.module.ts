import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputRoutesModule } from "./input-routes.module";
import { InputComponent } from "./input.component";
import { NgMoonModule } from "ng-moon";
import { ShareModule } from "src/share/share.module";

@NgModule({
  imports: [CommonModule, InputRoutesModule, NgMoonModule, ShareModule],
  declarations: [InputComponent],
  exports: [InputComponent]
})
export class InputModule {}
