import { Component } from '@angular/core';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XAffixComponent, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
