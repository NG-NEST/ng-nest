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

  get lang() {
    return this.config.lang as 'zh_CN' | 'en_US';
  }

  typeMap = new Map<string, AppProp>();

  getTypes(propType: string, propName: string) {
    let key = `${this.lang}-${propType}-${propName}`;
    let type = this.typeMap.get(key);
    if (!type) {
      type = this.setTypes(this.lang, propType, propName)!;
      this.typeMap.set(key, type);
    }
    this.prop = type;
  }

  private setTypes(lang: 'zh_CN' | 'en_US', propType: string, propName?: string) {
    const data = this.data[lang];
    const getTy = (pType: string, pName: string, values: string[]) => {
      if (!pType.startsWith('X')) {
        values.push(pType);
        return null;
      }

      let ty = data[pType];
      if (!ty) {
        ty = data[pName!];
        if (ty && ty.properties) {
          const property = ty.properties.find((x) => x.type === pType);
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
              const child = getTy(val, pName, values);
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
    const prop = getTy(propType, propName!, values);
    if (prop) {
      prop.actualValue = values;
    }
    return prop;
  }

  private splitParts(value: string) {
    if (value.indexOf('|') < 0) return [value];
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
        ty.children.push(this.setTypes(this.lang, `${match[1]}<T>`)!);
        ty.children.push(this.setTypes(this.lang, match[2])!);
      }
    } else if (regex2.test(type)) {
      regex2 = /^(.*?)\[]$/;
      let match = type.match(regex2);
      if (match) {
        ty.children.push({ ...this.setTypes(this.lang, match[1])!, isArray: true });
      }
    } else if (type.startsWith('X')) {
      ty.children.push(this.setTypes(this.lang, type)!);
    } else {
      ty.children.push({ name: type, label, description });
    }
    return ty;
  }
}
