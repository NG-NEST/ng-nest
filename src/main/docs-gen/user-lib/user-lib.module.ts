import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsUserLibComponent } from "./user-lib.component";
import { NsUserLibRoutesModule } from "./user-lib-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, NsUserLibRoutesModule{{ __custom }}],
  declarations: [NsUserLibComponent],
  exports: [NsUserLibComponent]
})
export class NsUserLibModule {}
