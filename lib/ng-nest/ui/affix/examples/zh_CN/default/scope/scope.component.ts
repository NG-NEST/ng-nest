import { Component } from '@angular/core';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-scope',
  standalone: true,
  imports: [XAffixComponent, XButtonComponent],
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ExScopeComponent {}
