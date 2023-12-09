import { Component } from '@angular/core';
import { XTypographyComponent } from '@ng-nest/ui/typography';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XTypographyComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  text = '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
}
