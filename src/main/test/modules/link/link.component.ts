import { Component } from '@angular/core';
import { ExDefaultComponent } from './default/default.component';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExIconComponent } from './icon/icon.component';
import { ExUnderlineComponent } from './underline/underline.component';

@Component({
  selector: 'te-link',
  standalone: true,
  imports: [ExDefaultComponent, ExDisabledComponent, ExIconComponent, ExUnderlineComponent],
  templateUrl: './link.component.html'
})
export class TeLinkComponent {}
