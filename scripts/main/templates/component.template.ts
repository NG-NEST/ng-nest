import { Component, ViewEncapsulation, ViewChildren } from "@angular/core";
{{ __imports }}
@Component({
  selector: "{{ __comName }}",
  templateUrl: "./{{ __fileName }}.component.html",
  encapsulation: ViewEncapsulation.None
})
export class {{ __capName }}Component {
  {{ __constant }}
}
