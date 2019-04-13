import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseRoutesModule } from "./course-routes.module";
import { CourseComponent } from "./course.component";

@NgModule({
  imports: [CommonModule, CourseRoutesModule],
  declarations: [CourseComponent],
  exports: [CourseComponent]
})
export class CourseModule {}
