import { Component } from '@angular/core';
import { ExDisabledComponent } from './disabled/disabled.component';
import { ExGroupComponent } from './group/group.component';
import { ExIconComponent } from './icon/icon.component';
import { ExLoadingComponent } from './loading/loading.component';
import { ExSizeComponent } from './size/size.component';
import { ExTextComponent } from './text/text.component';
import { ExDefaultComponent } from './default/default.component';

@Component({
  selector: 'te-button',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExDisabledComponent,
    ExGroupComponent,
    ExIconComponent,
    ExLoadingComponent,
    ExSizeComponent,
    ExTextComponent
  ],
  templateUrl: './button.component.html'
})
export class TeButtonComponent {}
