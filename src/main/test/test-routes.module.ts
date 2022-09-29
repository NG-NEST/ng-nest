import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
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
        loadChildren: () => import('./modules/popconfirm/popconfirm.module').then((x) => x.TePopconfirmModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./modules/message/message.module').then((x) => x.TeMessageModule)
      },
      {
        path: 'alert',
        loadChildren: () => import('./modules/alert/alert.module').then((x) => x.TeAlertModule)
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
        path: 'badge',
        loadChildren: () => import('./modules/badge/badge.module').then((x) => x.TeBadgeModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./modules/list/list.module').then((x) => x.TeListModule)
      },
      {
        path: 'slider-select',
        loadChildren: () => import('./modules/slider-select/slider-select.module').then((x) => x.TeSliderSelectModule)
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
        loadChildren: () => import('./modules/auto-complete/auto-complete.module').then((x) => x.TeAutoCompleteModule)
      },
      {
        path: 'dropdown',
        loadChildren: () => import('./modules/dropdown/dropdown.module').then((x) => x.TeDropdownModule)
      },
      {
        path: 'button',
        loadChildren: () => import('./modules/button/button.module').then((x) => x.TeButtonModule)
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
        loadChildren: () => import('./modules/avatar/avatar.module').then((x) => x.TeAvatarModule)
      },
      {
        path: 'tree-select',
        loadChildren: () => import('./modules/tree-select/tree-select.module').then((x) => x.TeTreeSelectModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('./modules/transfer/transfer.module').then((x) => x.TeTransferModule)
      },
      { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutesModule {}
