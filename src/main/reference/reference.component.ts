import { Component } from '@angular/core';
import { core } from '../docs/en_US/docs.types';
import { JsonPipe } from '@angular/common';
import { AppProp } from '@interfaces';
import { XIsString } from '@ng-nest/ui/core';
import { XPopoverDirective } from '@ng-nest/ui/popover';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [JsonPipe, XPopoverDirective],
  styleUrls: ['./reference.component.scss'],
  templateUrl: './reference.component.html'
})
export class ReferenceComponent {
  data = core;

  prop?: AppProp;

  get typeValues() {
    return this.prop?.typeValues?.join(' | ');
  }

  getTypes(str: string) {
    const getTy = (name: string, values: string[]) => {
      if (!name.startsWith('X')) {
        values.push(name);
        return null;
      }
      const ty = this.data.find((x) => x.name === name)!;
      if (ty) {
        ty.children = [];
        const { type, value } = ty;
        if (type === 'type') {
          if (XIsString(value)) {
            const vals = value.split('|').map((x) => x.trim());
            for (let val of vals) {
              const child = getTy(val, values);
              if (child) {
                ty.children.push(child);
              }
            }
          }
        }

        return ty;
      }
      return null;
    };
    const values: string[] = [];
    const prop = getTy(str, values);
    if (prop) {
      prop.typeValues = values;
    }

    this.prop = prop!;
  }
}
