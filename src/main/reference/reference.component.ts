import { Component } from '@angular/core';
import { core } from '../docs/en_US/docs.types';
import { JsonPipe } from '@angular/common';
import { AppProp } from '@interfaces';

@Component({
  selector: 'no-auth',
  standalone: true,
  imports: [JsonPipe],
  styleUrls: ['./reference.component.scss'],
  templateUrl: './reference.component.html'
})
export class ReferenceComponent {
  data = core;

  getTypes(type: string) {
    const types: AppProp[] = [];
    const ty = this.data.find((x) => x.name === type)!;
    ty && types.push(ty);

    console.log(types);
  }
}
