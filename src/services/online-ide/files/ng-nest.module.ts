import { classify } from '@utils';

export function importFromModules(modules: string[]) {
  if (modules.length === 0) return '';
  return modules.map((x) => `import { X${classify(x)}Module } from "@ng-nest/ui/${x}";`).join('\n');
}

export function importModules(modules: string[]) {
  if (modules.length === 0) return '';
  return modules.map((x) => `X${classify(x)}Module`).join(', ');
}

export default (modules: string[]) => {
  return `import { NgModule } from '@angular/core';
${importFromModules(modules)}
const modules = [${importModules(modules)}];
    
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class NgNestModule {}`;
};
