import { Component, ViewEncapsulation } from '@angular/core';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@Component({
  selector: 'ns-footer',
  imports: [XI18nPipe],
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {}
