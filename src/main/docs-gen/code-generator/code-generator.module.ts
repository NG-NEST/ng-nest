import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsCodeGeneratorComponent } from "./code-generator.component";
import { NsCodeGeneratorRoutesModule } from "./code-generator-routes.module";
{{ __imports }}
@NgModule({
  imports: [CommonModule, NsCodeGeneratorRoutesModule{{ __custom }}],
  declarations: [NsCodeGeneratorComponent],
  exports: [NsCodeGeneratorComponent]
})
export class NsCodeGeneratorModule {}
