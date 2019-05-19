import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsFormDesignComponent } from "./form-design.component";
import { NsFormDesignRoutesModule } from "./form-design-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsFormDesignRoutesModule],
  declarations: [NsFormDesignComponent],
  exports: [NsFormDesignComponent]
})
export class NsFormDesignModule {}
