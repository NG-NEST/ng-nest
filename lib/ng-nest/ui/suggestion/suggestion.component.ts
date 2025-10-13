import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XSuggestionProperty } from './suggestion.property';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@Component({
  selector: 'x-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XDropdownComponent]
})
export class XSuggestionComponent extends XSuggestionProperty {}
