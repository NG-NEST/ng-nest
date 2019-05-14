import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NsFormDesignComponent } from "./form-design.component";

const routes: Routes = [
  {
    path: "",
    component: NsFormDesignComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsFormDesignRoutesModule {}
