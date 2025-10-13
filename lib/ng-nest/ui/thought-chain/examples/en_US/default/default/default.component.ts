import { Component, signal } from '@angular/core';
import { XThoughtChainComponent } from '@ng-nest/ui/thought-chain';
import { XSenderComponent } from '@ng-nest/ui/sender';
import { FormsModule } from '@angular/forms';
import { XThoughtChainNode } from '@ng-nest/ui/thought-chain/thought-chain.property';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XThoughtChainComponent, XSenderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  data = signal<XThoughtChainNode[]>([
    { id: '#file', label: 'file', icon: 'fto-file' },
    { id: '#image', label: 'image', icon: 'fto-image' },
    { id: '#folder', label: 'folder', icon: 'fto-folder' },
    { id: '#folder/dist', pid: '#folder', label: 'dist', icon: 'fto-folder' },
    { id: '#folder/dist/ng-nest', pid: '#folder/dist', label: 'ng-nest', icon: 'fto-folder' },
    { id: '#folder/dist/ng-nest-site', pid: '#folder/dist', label: 'ng-nest-site', icon: 'fto-folder' },
    { id: '#folder/src', pid: '#folder', label: 'src', icon: 'fto-folder' },
    { id: '#folder/public', pid: '#folder', label: 'public', icon: 'fto-folder' }
  ]);
}
