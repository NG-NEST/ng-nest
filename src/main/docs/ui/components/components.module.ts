import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsRoutesModule } from "./components-routes.module";
import { ComponentsComponent } from "./components.component";

@NgModule({
  imports: [CommonModule, ComponentsRoutesModule],
  declarations: [ComponentsComponent],
  exports: [ComponentsComponent]
})
export class ComponentsModule {}
