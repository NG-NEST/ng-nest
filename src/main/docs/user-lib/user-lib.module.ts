import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsUserLibComponent } from "./user-lib.component";
import { NsUserLibRoutesModule } from "./user-lib-routes.module";

@NgModule({
  imports: [CommonModule, NsUserLibRoutesModule],
  declarations: [NsUserLibComponent],
  exports: [NsUserLibComponent]
})
export class NsUserLibModule {}
