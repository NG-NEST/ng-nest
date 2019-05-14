import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NsCourseComponent } from "./course.component";
import { NsCourseRoutesModule } from "./course-routes.module";

@NgModule({
  imports: [CommonModule, NsCourseRoutesModule],
  declarations: [NsCourseComponent],
  exports: [NsCourseComponent]
})
export class NsCourseModule {}
