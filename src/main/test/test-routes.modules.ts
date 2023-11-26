import { Routes } from '@angular/router';
import { environment } from '@environments';
import { TestComponent } from './test.component';

export const TestRoutes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },
      {
        path: 'affix',
        loadComponent: () => import('./affix/affix.component').then((x) => x.TeAffixComponent)
      },
      {
        path: 'alert',
        loadComponent: () => import('./alert/alert.component').then((x) => x.TeAlertComponent)
      },
      {
        path: 'anchor',
        loadComponent: () => import('./anchor/anchor.component').then((x) => x.TeAnchorComponent)
      },
      {
        path: 'auto-complete',
        loadComponent: () =>
          import('./auto-complete/auto-complete.component').then((x) => x.TeAutoCompleteComponent)
      },
      {
        path: 'avatar',
        loadComponent: () => import('./avatar/avatar.component').then((x) => x.TeAvatarComponent)
      },
      {
        path: 'back-top',
        loadComponent: () =>
          import('./back-top/back-top.component').then((x) => x.TeBackTopComponent)
      },
      {
        path: 'badge',
        loadComponent: () => import('./badge/badge.component').then((x) => x.TeBadgeComponent)
      },
      {
        path: 'button',
        loadComponent: () => import('./button/button.component').then((x) => x.TeButtonComponent)
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calendar/calendar.component').then((x) => x.TeCalendarComponent)
      },
      {
        path: 'card',
        loadComponent: () => import('./card/card.component').then((x) => x.TeCardComponent)
      },
      {
        path: 'carousel',
        loadComponent: () =>
          import('./carousel/carousel.component').then((x) => x.TeCarouselComponent)
      },
      {
        path: 'cascade',
        loadComponent: () => import('./cascade/cascade.component').then((x) => x.TeCascadeComponent)
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./checkbox/checkbox.component').then((x) => x.TeCheckboxComponent)
      }
    ]
  }
];
