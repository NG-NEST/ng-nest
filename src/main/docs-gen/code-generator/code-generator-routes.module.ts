import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsCodeGeneratorComponent } from "./code-generator.component";
{{ __imports }}
const routes: Routes = [
  {
    path: "",
    component: NsCodeGeneratorComponent,
    children: [{{ __children }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsCodeGeneratorRoutesModule {}
