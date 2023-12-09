import { Component, ViewEncapsulation } from '@angular/core';
import { OnlineIdeService } from '@services';
import { ShareModule } from '@share';
{{ __imports }}
@Component({
  selector: '{{ __comName }}',
  standalone: true,
  imports: [ShareModule{{ __declarations }}],
  templateUrl: './{{ __fileName }}.component.html',
  encapsulation: ViewEncapsulation.None
})
export class {{ __capName }}Component {
  constructor(public ois: OnlineIdeService) {}
  {{ __constant }}
}
