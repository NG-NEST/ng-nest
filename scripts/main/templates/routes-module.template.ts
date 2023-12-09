import { Routes } from '@angular/router';
import { {{ __capName }}Component } from './{{ __fileName }}.component';
{{ __imports }}
export const {{ __capName }}Routes: Routes = [
  {
    path: '',
    component: {{ __capName }}Component,
    children: [{{ __loadChildren }}]
  }
];
