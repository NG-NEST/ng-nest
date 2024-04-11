import { Injectable } from '@angular/core';
import { XIsString } from '@ng-nest/ui/core';
import { zh_CN, en_US, AppProp, AppPrope } from '@interfaces';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class TypesService {
  constructor(private config: ConfigService) {}

  data = {
    zh_CN,
    en_US
  };

  prop?: AppProp;

  getTypes(propType: string, propName: string) {
    this.prop = this.setTypes(propType, propName)!;
  }

  private setTypes(propType: string, propName?: string) {
    const data = this.data[this.config.lang as 'zh_CN' | 'en_US'];
    const getTy = (tyName: string, values: string[]) => {
      if (!tyName.startsWith('X')) {
        values.push(tyName);
        return null;
      }

      let ty = data[propType];
      if (!ty) {
        ty = data[propName!];
        if (ty && ty.properties) {
          const property = ty.properties.find((x) => x.type === propType);
          ty = this.setGroup(property)!;

          return ty;
        }
      } else {
        ty.children = [];
        const { type, value } = ty;
        if (type === 'type') {
          if (XIsString(value)) {
            const vals = this.splitParts(value);
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
    const prop = getTy(propType, values);
    if (prop) {
      prop.actualValue = values;
    }
    return prop;
  }

  private splitParts(value: string) {
    const regex = /(\w+)\[\]|(\w+)<([^>]+)>|(\w+)/g;
    const parts = [];
    let match;

    while ((match = regex.exec(value)) !== null) {
      if (match[1]) {
        parts.push(match[1] + '[]');
      } else if (match[2]) {
        const innerParts = match[3].split(' | ').map((p) => p.trim());
        parts.push(match[2] + '<' + innerParts.join(' | ') + '>');
      } else if (match[4]) {
        parts.push(match[4]);
      }
    }

    return parts;
  }

  private setGroup(property?: AppPrope): AppProp | null {
    if (!property) return null;
    const { type, label, description } = property;
    let ty: AppProp = { name: type, label, description, type: 'group' };
    ty.children = [];
    if (!type) return null;
    let regex1 = /^\w+<[\w\[\]]+>$/; // ex: propType = "xxx<yyyy>"
    let regex2 = /^([^\[]+)\[]$/; // ex: propType = "xxx[]"
    if (regex1.test(type)) {
      regex1 = /^(\w+)<(\w+)>$/;
      let match = type.match(regex1);
      if (match) {
        ty.children.push(this.setTypes(`${match[1]}<T>`)!);
        ty.children.push(this.setTypes(match[2])!);
      }
    } else if (regex2.test(type)) {
      regex2 = /^(.*?)\[]$/;
      let match = type.match(regex2);
      if (match) {
        ty.children.push({ ...this.setTypes(match[1])!, isArray: true });
      }
    } else if (type.startsWith('X')) {
      ty.children.push(this.setTypes(type)!);
    } else {
      ty.children.push({ name: type, label, description });
    }
    return ty;
  }
}
