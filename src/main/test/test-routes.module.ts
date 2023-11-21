import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { TestComponent } from './test.component';

const testModules: Routes = [
  {
    path: 'affix',
    loadComponent: () => import('./modules/affix/affix.component').then((x) => x.TeAffixComponent)
  },
  {
    path: 'icon',
    loadComponent: () => import('./modules/icon/icon.component').then((x) => x.TeIconComponent)
  },
  {
    path: 'empty',
    loadComponent: () => import('./modules/empty/empty.component').then((x) => x.TeEmptyComponent)
  },
  {
    path: 'link',
    loadComponent: () => import('./modules/link/link.component').then((x) => x.TeLinkComponent)
  },
  {
    path: 'alert',
    loadComponent: () => import('./modules/alert/alert.component').then((x) => x.TeAlertComponent)
  },
  {
    path: 'table',
    loadChildren: () => import('./modules/table/table.module').then((x) => x.TeTableModule)
  },
  {
    path: 'carousel',
    loadChildren: () => import('./modules/carousel/carousel.module').then((x) => x.TeCarouselModule)
  },
  {
    path: 'select',
    loadChildren: () => import('./modules/select/select.module').then((x) => x.TeSelectModule)
  },
  {
    path: 'drawer',
    loadChildren: () => import('./modules/drawer/drawer.module').then((x) => x.TeDrawerModule)
  },
  {
    path: 'dialog',
    loadChildren: () => import('./modules/dialog/dialog.module').then((x) => x.TeDialogModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./modules/progress/progress.module').then((x) => x.TeProgressModule)
  },
  {
    path: 'steps',
    loadChildren: () => import('./modules/steps/steps.module').then((x) => x.TeStepsModule)
  },
  {
    path: 'popconfirm',
    loadChildren: () =>
      import('./modules/popconfirm/popconfirm.module').then((x) => x.TePopconfirmModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./modules/message/message.module').then((x) => x.TeMessageModule)
  },
  {
    path: 'message-box',
    loadChildren: () =>
      import('./modules/message-box/message-box.module').then((x) => x.TeMessageBoxModule)
  },
  {
    path: 'find',
    loadChildren: () => import('./modules/find/find.module').then((x) => x.TeFindModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./modules/form/form.module').then((x) => x.TeFormModule)
  },
  {
    path: 'tree',
    loadChildren: () => import('./modules/tree/tree.module').then((x) => x.TeTreeModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then((x) => x.TeMenuModule)
  },
  {
    path: 'tooltip',
    loadChildren: () => import('./modules/tooltip/tooltip.module').then((x) => x.TeTooltipModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./modules/timeline/timeline.module').then((x) => x.TeTimelineModule)
  },
  {
    path: 'tag',
    loadChildren: () => import('./modules/tag/tag.module').then((x) => x.TeTagModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./modules/tabs/tabs.module').then((x) => x.TeTabsModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./modules/popover/popover.module').then((x) => x.TePopoverModule)
  },
  {
    path: 'collapse',
    loadChildren: () => import('./modules/collapse/collapse.module').then((x) => x.TeCollapseModule)
  },
  {
    path: 'input',
    loadChildren: () => import('./modules/input/input.module').then((x) => x.TeInputModule)
  },
  {
    path: 'input-number',
    loadChildren: () =>
      import('./modules/input-number/input-number.module').then((x) => x.TeInputNumberModule)
  },
  {
    path: 'badge',
    loadComponent: () => import('./modules/badge/badge.component').then((x) => x.TeBadgeComponent)
  },
  {
    path: 'list',
    loadChildren: () => import('./modules/list/list.module').then((x) => x.TeListModule)
  },
  {
    path: 'slider-select',
    loadChildren: () =>
      import('./modules/slider-select/slider-select.module').then((x) => x.TeSliderSelectModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./modules/upload/upload.module').then((x) => x.TeUploadModule)
  },
  {
    path: 'rate',
    loadChildren: () => import('./modules/rate/rate.module').then((x) => x.TeRateModule)
  },
  {
    path: 'auto-complete',
    loadChildren: () =>
      import('./modules/auto-complete/auto-complete.module').then((x) => x.TeAutoCompleteModule)
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./modules/dropdown/dropdown.module').then((x) => x.TeDropdownModule)
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./modules/button/button.component').then((x) => x.TeButtonComponent)
  },
  {
    path: 'textarea',
    loadChildren: () => import('./modules/textarea/textarea.module').then((x) => x.TeTextareaModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./modules/image/image.module').then((x) => x.TeImageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar/calendar.module').then((x) => x.TeCalendarModule)
  },
  {
    path: 'avatar',
    loadComponent: () =>
      import('./modules/avatar/avatar.component').then((x) => x.TeAvatarComponent)
  },
  {
    path: 'tree-select',
    loadChildren: () =>
      import('./modules/tree-select/tree-select.module').then((x) => x.TeTreeSelectModule)
  },
  {
    path: 'transfer',
    loadChildren: () => import('./modules/transfer/transfer.module').then((x) => x.TeTransferModule)
  },
  {
    path: 'highlight',
    loadChildren: () =>
      import('./modules/highlight/highlight.module').then((x) => x.TeHighlightModule)
  },
  {
    path: 'anchor',
    loadChildren: () => import('./modules/anchor/anchor.module').then((x) => x.TeAnchorModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./modules/radio/radio.module').then((x) => x.TeRadioModule)
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./modules/checkbox/checkbox.module').then((x) => x.TeCheckboxModule)
  },
  {
    path: 'date-picker',
    loadChildren: () =>
      import('./modules/date-picker/date-picker.module').then((x) => x.TeDatePickerModule)
  },
  {
    path: 'pagination',
    loadChildren: () =>
      import('./modules/pagination/pagination.module').then((x) => x.TePaginationModule)
  },
  {
    path: 'time-picker',
    loadChildren: () =>
      import('./modules/time-picker/time-picker.module').then((x) => x.TeTimePickerModule)
  },
  {
    path: 'switch',
    loadChildren: () => import('./modules/switch/switch.module').then((x) => x.TeSwitchModule)
  },
  {
    path: 'color-picker',
    loadChildren: () =>
      import('./modules/color-picker/color-picker.module').then((x) => x.TeColorPickerModule)
  },
  {
    path: 'tree-file',
    loadChildren: () =>
      import('./modules/tree-file/tree-file.module').then((x) => x.TeTreeFileModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      testModules.find((x) => x.path === environment.defaultPage)!,
      { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutesModule {}
