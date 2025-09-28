import { Component } from '@angular/core';
import {
  ExAntDesignComponent,
  ExCustomComponent,
  ExEvaComponent,
  ExFeatherComponent,
  ExMaterialDesignComponent,
  ExFontAwesomeComponent
} from '@ng-nest/ui/icon/examples';

@Component({
  selector: 'te-icon',
  imports: [
    ExCustomComponent,
    ExFeatherComponent,
    ExAntDesignComponent,
    ExEvaComponent,
    ExMaterialDesignComponent,
    ExFontAwesomeComponent
  ],
  templateUrl: './icon.component.html'
})
export class TeIconComponent {}
