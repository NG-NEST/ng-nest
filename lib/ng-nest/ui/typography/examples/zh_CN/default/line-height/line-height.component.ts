import { Component, signal } from '@angular/core';

@Component({
  selector: 'ex-line-height',
  templateUrl: './line-height.component.html'
})
export class ExLineHeightComponent {
  text = signal('天将降大任于是人也，<br/>必先苦其心志，劳其筋骨<br/>，饿其体肤');
}
