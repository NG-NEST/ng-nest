import { Component } from '@angular/core';
import { core } from '../docs/en_US/docs.types';
import { JsonPipe } from '@angular/common';
// import { XOrderBy } from '@ng-nest/ui/core';

@Component({
  selector: 'no-auth',
  standalone: true,
  imports: [JsonPipe],
  styleUrls: ['./reference.component.scss'],
  templateUrl: './reference.component.html'
})
export class ReferenceComponent {
  data = core;
}
