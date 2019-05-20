import { ShareModule } from 'src/share/share.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsComponentsComponent } from "./components.component";
import { NsComponentsRoutesModule } from "./components-routes.module";

@NgModule({
  imports: [CommonModule, ShareModule, NsComponentsRoutesModule],
  declarations: [NsComponentsComponent],
  exports: [NsComponentsComponent]
})
export class NsComponentsModule {}
