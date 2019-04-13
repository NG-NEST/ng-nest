import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuideComponent } from "./guide.component";

const routes: Routes = [
  {
    path: "",
    component: GuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutesModule {}
