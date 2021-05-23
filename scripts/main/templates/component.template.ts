import { Component, ViewEncapsulation } from '@angular/core';
import { OnlineIdeService } from '@services';
{{ __imports }}
@Component({
  selector: '{{ __comName }}',
  templateUrl: './{{ __fileName }}.component.html',
  encapsulation: ViewEncapsulation.None
})
export class {{ __capName }}Component {
  constructor(public ois: OnlineIdeService) {}
  {{ __constant }}
}
