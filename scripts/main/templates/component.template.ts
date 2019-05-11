import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "{{ comName }}",
  templateUrl: "./{{ fileName }}.component.html",
  encapsulation: ViewEncapsulation.None
})
export class {{ capName }}Component {}
