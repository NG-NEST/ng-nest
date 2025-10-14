import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCardComponent } from '@ng-nest/ui/card';
import { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XThoughtChainComponent, XRadioComponent, XCardComponent],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class ExSizeComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
  data = signal<XThoughtChainNode[]>([
    { id: '111', label: 'Thought chain title - 1', description: 'Thought chain description - 1' },
    { id: '222', label: 'Thought chain title - 2', description: 'Thought chain description - 2' },
    { id: '333', label: 'Thought chain title - 3', description: 'Thought chain description - 3' },
    { id: '444', label: 'Thought chain title - 4', description: 'Thought chain description - 4' }
  ]);
}
