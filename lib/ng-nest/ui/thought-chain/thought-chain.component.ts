import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XThoughtChainProperty } from './thought-chain.property';
import { XTimelineComponent } from '@ng-nest/ui/timeline';

@Component({
  selector: 'x-thought-chain',
  templateUrl: './thought-chain.component.html',
  styleUrls: ['./thought-chain.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [XTimelineComponent]
})
export class XThoughtChainComponent extends XThoughtChainProperty {}
