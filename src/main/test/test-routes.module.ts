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
        path: 'attachments',
        loadComponent: () => import('./attachments/attachments.component').then((x) => x.TeAttachmentsComponent)
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
        path: 'bubble',
        loadComponent: () => import('./bubble/bubble.component').then((x) => x.TeBubbleComponent)
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
        path: 'coversations',
        loadComponent: () => import('./coversations/coversations.component').then((x) => x.TeCoversationsComponent)
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
      },
      {
        path: 'empty',
        loadComponent: () => import('./empty/empty.component').then((x) => x.TeEmptyComponent)
      },
      {
        path: 'find',
        loadComponent: () => import('./find/find.component').then((x) => x.TeFindComponent)
      },
      {
        path: 'form',
        loadComponent: () => import('./form/form.component').then((x) => x.TeFormComponent)
      },
      {
        path: 'highlight',
        loadComponent: () => import('./highlight/highlight.component').then((x) => x.TeHighlightComponent)
      },
      {
        path: 'icon',
        loadComponent: () => import('./icon/icon.component').then((x) => x.TeIconComponent)
      },
      {
        path: 'image',
        loadComponent: () => import('./image/image.component').then((x) => x.TeImageComponent)
      },
      {
        path: 'input',
        loadComponent: () => import('./input/input.component').then((x) => x.TeInputComponent)
      },
      {
        path: 'input-number',
        loadComponent: () => import('./input-number/input-number.component').then((x) => x.TeInputNumberComponent)
      },
      {
        path: 'layout',
        loadComponent: () => import('./layout/layout.component').then((x) => x.TeLayoutComponent)
      },
      {
        path: 'link',
        loadComponent: () => import('./link/link.component').then((x) => x.TeLinkComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then((x) => x.TeListComponent)
      },
      {
        path: 'loading',
        loadComponent: () => import('./loading/loading.component').then((x) => x.TeLoadingComponent)
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu.component').then((x) => x.TeMenuComponent)
      },
      {
        path: 'message',
        loadComponent: () => import('./message/message.component').then((x) => x.TeMessageComponent)
      },
      {
        path: 'message-box',
        loadComponent: () => import('./message-box/message-box.component').then((x) => x.TeMessageBoxComponent)
      },
      {
        path: 'notification',
        loadComponent: () => import('./notification/notification.component').then((x) => x.TeNotificationComponent)
      },
      {
        path: 'outlet',
        loadComponent: () => import('./outlet/outlet.component').then((x) => x.TeOutletComponent)
      },
      {
        path: 'page-header',
        loadComponent: () => import('./page-header/page-header.component').then((x) => x.TePageHeaderComponent)
      },
      {
        path: 'pagination',
        loadComponent: () => import('./pagination/pagination.component').then((x) => x.TePaginationComponent)
      },
      {
        path: 'popconfirm',
        loadComponent: () => import('./popconfirm/popconfirm.component').then((x) => x.TePopconfirmComponent)
      },
      {
        path: 'popover',
        loadComponent: () => import('./popover/popover.component').then((x) => x.TePopoverComponent)
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.component').then((x) => x.TeProgressComponent)
      },
      {
        path: 'prompts',
        loadComponent: () => import('./prompts/prompts.component').then((x) => x.TePromptsComponent)
      },
      {
        path: 'radio',
        loadComponent: () => import('./radio/radio.component').then((x) => x.TeRadioComponent)
      },
      {
        path: 'rate',
        loadComponent: () => import('./rate/rate.component').then((x) => x.TeRateComponent)
      },
      {
        path: 'result',
        loadComponent: () => import('./result/result.component').then((x) => x.TeResultComponent)
      },
      {
        path: 'select',
        loadComponent: () => import('./select/select.component').then((x) => x.TeSelectComponent)
      },
      {
        path: 'sender',
        loadComponent: () => import('./sender/sender.component').then((x) => x.TeSenderComponent)
      },
      {
        path: 'skeleton',
        loadComponent: () => import('./skeleton/skeleton.component').then((x) => x.TeSkeletonComponent)
      },
      {
        path: 'slider',
        loadComponent: () => import('./slider/slider.component').then((x) => x.TeSliderComponent)
      },
      {
        path: 'slider-select',
        loadComponent: () => import('./slider-select/slider-select.component').then((x) => x.TeSliderSelectComponent)
      },
      {
        path: 'statistic',
        loadComponent: () => import('./statistic/statistic.component').then((x) => x.TeStatisticComponent)
      },
      {
        path: 'steps',
        loadComponent: () => import('./steps/steps.component').then((x) => x.TeStepsComponent)
      },
      {
        path: 'switch',
        loadComponent: () => import('./switch/switch.component').then((x) => x.TeSwitchComponent)
      },
      {
        path: 'scrollable',
        loadComponent: () => import('./scrollable/scrollable.component').then((x) => x.TeScrollableComponent)
      },
      {
        path: 'suggestion',
        loadComponent: () => import('./suggestion/suggestion.component').then((x) => x.TeSuggestionComponent)
      },
      {
        path: 'table',
        loadComponent: () => import('./table/table.component').then((x) => x.TeTableComponent)
      },
      {
        path: 'table-view',
        loadComponent: () => import('./table-view/table-view.component').then((x) => x.TeTableViewComponent)
      },
      {
        path: 'tabs',
        loadComponent: () => import('./tabs/tabs.component').then((x) => x.TeTabsComponent)
      },
      {
        path: 'tag',
        loadComponent: () => import('./tag/tag.component').then((x) => x.TeTagComponent)
      },
      {
        path: 'text-retract',
        loadComponent: () => import('./text-retract/text-retract.component').then((x) => x.TeTextRetractComponent)
      },
      {
        path: 'textarea',
        loadComponent: () => import('./textarea/textarea.component').then((x) => x.TeTextareaComponent)
      },
      {
        path: 'theme',
        loadComponent: () => import('./theme/theme.component').then((x) => x.TeThemeComponent)
      },
      {
        path: 'time-ago',
        loadComponent: () => import('./time-ago/time-ago.component').then((x) => x.TeTimeAgoComponent)
      },
      {
        path: 'time-picker',
        loadComponent: () => import('./time-picker/time-picker.component').then((x) => x.TeTimePickerComponent)
      },
      {
        path: 'time-range',
        loadComponent: () => import('./time-range/time-range.component').then((x) => x.TeTimeRangeComponent)
      },
      {
        path: 'timeline',
        loadComponent: () => import('./timeline/timeline.component').then((x) => x.TeTimelineComponent)
      },
      {
        path: 'tooltip',
        loadComponent: () => import('./tooltip/tooltip.component').then((x) => x.TeTooltipComponent)
      },
      {
        path: 'transfer',
        loadComponent: () => import('./transfer/transfer.component').then((x) => x.TeTransferComponent)
      },
      {
        path: 'tree',
        loadComponent: () => import('./tree/tree.component').then((x) => x.TeTreeComponent)
      },
      {
        path: 'tree-file',
        loadComponent: () => import('./tree-file/tree-file.component').then((x) => x.TeTreeFileComponent)
      },
      {
        path: 'tree-select',
        loadComponent: () => import('./tree-select/tree-select.component').then((x) => x.TeTreeSelectComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography/typography.component').then((x) => x.TeTypographyComponent)
      },
      {
        path: 'upload',
        loadComponent: () => import('./upload/upload.component').then((x) => x.TeUploadComponent)
      },
      {
        path: 'welcome',
        loadComponent: () => import('./welcome/welcome.component').then((x) => x.TeWelcomeComponent)
      }
    ]
  }
];
