import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnlineIdeService, TypesService } from '@services';
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
  constructor(public ois: OnlineIdeService, public types: TypesService, public ds: DomSanitizer) {}
  {{ __constant }}

  safeHTML(str: string) {
    return this.ds.bypassSecurityTrustHtml(str);
  } 
}
