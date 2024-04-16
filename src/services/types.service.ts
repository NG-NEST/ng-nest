import { Injectable } from '@angular/core';
import { XIsString } from '@ng-nest/ui/core';
import { zh_CN, en_US, AppProp, AppPrope } from '@interfaces';
import { ConfigService } from './config.service';
import { XDialogService } from '@ng-nest/ui/dialog';
import { NsReferenceComponent } from '@share';

@Injectable({ providedIn: 'root' })
export class TypesService {
  constructor(
    private config: ConfigService,
    private dialog: XDialogService
  ) {}

  data = {
    zh_CN,
    en_US
  };

  prop?: AppProp;

  get lang(): 'zh_CN' | 'en_US' {
    // return this.config.lang as 'zh_CN' | 'en_US';
    return this.config.lang ? 'en_US' : 'en_US';
  }

  typeMap = new Map<string, AppProp>();

  getTypes(propType: string, propName: string) {
    let key = `${this.lang}-${propType}-${propName}`;
    const isExist = this.typeMap.has(key);
    if (isExist) {
      this.prop = this.typeMap.get(key);
    } else {
      this.prop = this.setTypes(this.lang, propType, propName)!;
      this.typeMap.set(key, this.prop);
    }
  }

  reference(propType: string, propName: string) {
    let key = `${this.lang}-${propType}-${propName}`;
    const isExist = this.typeMap.has(key);
    if (isExist) {
      this.prop = this.typeMap.get(key);
    } else {
      this.prop = this.setTypes(this.lang, propType, propName)!;
      this.typeMap.set(key, this.prop);
    }
    this.dialog.create(NsReferenceComponent, {
      width: '45rem',
      data: {
        property: this.prop
      }
    });
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
        } else if (type === 'interface') {
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
    const parts = [];
    let str = value;
    let i = 0;
    const max = str.length;
    let item = '';
    let special = false;
    while (i < max) {
      const char = str[i];
      if (char === '<') {
        special = true;
      }
      if (special) {
        if (char === '>') {
          special = false;
        }
      }
      if (char !== '|' || special) {
        item += char;
        if (i === max - 1) {
          parts.push(item.trim());
        }
      } else {
        parts.push(item.trim());
        item = '';
      }
      i++;
    }

    return parts;
  }

  private setGroup(property?: AppPrope): AppProp | null {
    if (!property) return null;
    const { type, label, description, example } = property;
    let ty: AppProp = { name: type, label, description, example, type: 'group' };
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
