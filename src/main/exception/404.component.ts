import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { XI18nPipe } from '@ng-nest/ui/i18n';

@Component({
  selector: 'exception-404',
  imports: [XI18nPipe, RouterLink],
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  document = inject(DOCUMENT);

  back() {
    this.document.defaultView?.history.back();
  }
}
