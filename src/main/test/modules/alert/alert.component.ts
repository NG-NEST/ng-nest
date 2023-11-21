import { Component } from '@angular/core';
import { ExCustomComponent } from './custom/custom.component';
import { ExDefaultComponent } from './default/default.component';
import { ExDescriptionComponent } from './description/description.component';
import { ExEffectComponent } from './effect/effect.component';
import { ExIconComponent } from './icon/icon.component';

@Component({
  selector: 'te-alert',
  standalone: true,
  imports: [
    ExCustomComponent,
    ExDefaultComponent,
    ExDescriptionComponent,
    ExEffectComponent,
    ExIconComponent
  ],
  templateUrl: './alert.component.html'
})
export class TeAlertComponent {}
