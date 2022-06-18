import { classify } from '@utils';

export function importFromProviders(selector: string, providers: string[]) {
  if (providers.length === 0) return '';
  return providers.map((x) => `import { ${classify(x)}Service } from "./${selector}/${x}.service";`).join('\n');
}

export function importFromOtherSelectors(selector: string, otherSelectors: string[]) {
  if (otherSelectors.length === 0) return '';
  return otherSelectors.map((x) => `import { Ex${classify(x)}Component } from "./${selector}/${x}.component";`).join('\n');
}

export function importProviders(providers: string[]) {
  if (providers.length === 0) return '';
  return providers.map((x) => `${classify(x)}Service`).join(', ');
}

export function declarationOtherSelectors(otherSelectors: string[]) {
  if (otherSelectors.length === 0) return '';
  return otherSelectors.map((x) => `Ex${classify(x)}Component`).join(', ');
}

export default (selector: string, otherSelectors: string[], providers: string[]) => {
  return `import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
  
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgNestModule } from './ng-nest.module';
import { Ex${classify(selector)}Component } from "./${selector}/${selector}.component";
${importFromOtherSelectors(selector, otherSelectors)}
${importFromProviders(selector, providers)}
@NgModule({
  declarations: [AppComponent, Ex${classify(selector)}Component, ${declarationOtherSelectors(otherSelectors)}],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgNestModule],
  providers: [${importProviders(providers)}],
  bootstrap: [AppComponent]
})
export class AppModule {}
`;
};
