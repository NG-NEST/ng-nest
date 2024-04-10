import { Injectable } from '@angular/core';
import { XIsString } from '@ng-nest/ui/core';
import { zh_CN, en_US, AppProp } from '@interfaces';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class TypesService {
  constructor(private config: ConfigService) {}

  data = {
    zh_CN,
    en_US
  };

  get typeValues() {
    return this.prop?.typeValues?.join(' | ');
  }

  prop?: AppProp;
  getTypes(str: string) {
    const getTy = (name: string, values: string[]) => {
      if (!name.startsWith('X')) {
        values.push(name);
        return null;
      }

      const ty = this.data[this.config.lang as 'zh_CN' | 'en_US'].find((x) => x.name === name) as AppProp;
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
