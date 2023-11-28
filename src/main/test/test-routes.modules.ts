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
        loadComponent: () => import('./auto-complete/auto-complete.component').then((x) => x.TeAutoCompleteComponent)
      },
      {
        path: 'avatar',
        loadComponent: () => import('./avatar/avatar.component').then((x) => x.TeAvatarComponent)
      },
      {
        path: 'back-top',
        loadComponent: () => import('./back-top/back-top.component').then((x) => x.TeBackTopComponent)
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
        loadComponent: () => import('./calendar/calendar.component').then((x) => x.TeCalendarComponent)
      },
      {
        path: 'card',
        loadComponent: () => import('./card/card.component').then((x) => x.TeCardComponent)
      },
      {
        path: 'carousel',
        loadComponent: () => import('./carousel/carousel.component').then((x) => x.TeCarouselComponent)
      },
      {
        path: 'cascade',
        loadComponent: () => import('./cascade/cascade.component').then((x) => x.TeCascadeComponent)
      },
      {
        path: 'checkbox',
        loadComponent: () => import('./checkbox/checkbox.component').then((x) => x.TeCheckboxComponent)
      },
      {
        path: 'collapse',
        loadComponent: () => import('./collapse/collapse.component').then((x) => x.TeCollapseComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./color/color.component').then((x) => x.TeColorComponent)
      },
      {
        path: 'color-picker',
        loadComponent: () => import('./color-picker/color-picker.component').then((x) => x.TeColorPickerComponent)
      },
      {
        path: 'comment',
        loadComponent: () => import('./comment/comment.component').then((x) => x.TeCommentComponent)
      },
      {
        path: 'container',
        loadComponent: () => import('./container/container.component').then((x) => x.TeContainerComponent)
      },
      {
        path: 'crumb',
        loadComponent: () => import('./crumb/crumb.component').then((x) => x.TeCrumbComponent)
      },
      {
        path: 'date-picker',
        loadComponent: () => import('./date-picker/date-picker.component').then((x) => x.TeDatePickerComponent)
      },
      {
        path: 'description',
        loadComponent: () => import('./description/description.component').then((x) => x.TeDescriptionComponent)
      },
      {
        path: 'dialog',
        loadComponent: () => import('./dialog/dialog.component').then((x) => x.TeDialogComponent)
      },
      {
        path: 'drawer',
        loadComponent: () => import('./drawer/drawer.component').then((x) => x.TeDrawerComponent)
      },
      {
        path: 'dropdown',
        loadComponent: () => import('./dropdown/dropdown.component').then((x) => x.TeDropdownComponent)
      }
    ]
  }
];
