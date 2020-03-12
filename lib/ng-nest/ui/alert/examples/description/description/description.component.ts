import { Component } from '@angular/core';

@Component({
  selector: 'ex-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class ExDescriptionComponent {
  content =
    '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。';
}
