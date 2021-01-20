---
order: 4
label: '4. UI Navigation'
---

# Navigation Bar

In the previous section, we completed the creation of the front-end frame page. In this part of the tutorial, you will complete the following tasks:ed the creation of the front-end frame page. In this part of the tutorial, you will complete the following tasks:

- use `x-menu` component to create side navigation to create side navigation
- use `x-slider` component to create tab navigationto create tab navigation
- use `x-crumb` component to create breadcrumb navigationto create breadcrumb navigation

Code after completing this section:<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/4-ui-navigation" target="_blank">Github address</a>。

## Installation @ng-nest/ui

Install `@ng-nest/ui` can view <a href="https://ngnest.com/index/docs/en_US/ui/getting-started" target="_blank">Get started quickly</a>

## Add side navigation

Use the menu here <a href="https://ngnest.com/index/docs/en_US/ui/components/menu" target="_blank">x-menu</a> Component to create side navigation, layout method use `column`。

Open the `sidebar.component.html` file and modify it as follows:

{{ __1\__ui:src/layout/index/sidebar/sidebar.component.html:false:true }}

The corresponding `data` in `sidebar.component.ts` is configured as a subscribeable object

{{ __2\__ui:src/layout/index/sidebar/sidebar.component.ts:false:true }}

Correspondingly create an `index.service.ts` service to define the menu data

{{ __3\__ui:src/layout/index/index.service.ts:false:true }}

The module routing in the system management is also configured here, and the corresponding module file is established under `ui/src/main/system`:

- `users` User Management
- `roles` Role management
- `organization` Organization Management
- `menus` Menu management

{{ __4\__ui:src/environments/routes.ts:true:true }}

{{ __5\__gif:menus.gif:false:false }}

## Add tab navigation

The tabs at the top of the tab page `tabs` can be created by monitoring routing, here a sliding menu <a href="https://ngnest.com/index/docs/en_US/ui/components/menu" target="_blank" >x-slider</a> component to create.

Open the `tabs.component.html` file and modify it as follows:

{{ __6\__ui:src/layout/index/tabs/tabs.component.html:false:true }}

Here, use the template customization function provided by the `slider` component to display the menu content. The corresponding `tabs.component.ts` file is modified as follows:

{{ __7\__ui:src/layout/index/tabs/tabs.component.ts:false:false }}

- `activatedIndex` correspond to the currently active tab
- `showClose` show the relationship button of the tab
- `indexChange()` tab page change event, jump route when clicking the tab page
- `close()` close tab event

The corresponding `index.service.ts` service is modified as follows:

{{ __8\__ui:src/layout/index/index.service.ts:false:true }}

- Add `tabs` to store tab page data
- Add `session` to store current page, subpage and parameter data
- Use the `events` event provided by `Router` in the constructor to monitor the route jump end event, which is used to set the tab page data
- `setTabs()` build tab page data based on the current address bar data and compare `menus` data
- `getUrl()` the string data in the address bar is converted into an object

The style files and the corresponding module import files are also modified here:

{{ __9\__ui:src/layout/index/index.component.scss:true:true }}

{{ __10\__gif:tabs.gif:false:false }}

## Add breadcrumb navigation

The breadcrumb navigation data is created in the same way as the monitoring route. Open the `index.service.ts` file:

{{ __11\__ui:src/layout/index/index.service.ts:false:true }}

Add the `x-crumb` component to the corresponding breadcrumb navigation:

{{ __12\__ui:src/layout/index/crumb/crumb.component.html:true:true }}

The style files and the corresponding module import files are also modified here:

{{ __13\__ui:src/layout/index/index.component.scss:true:true }}

{{ __14\__gif:crumb.gif:false:false }}

## 下一步

In this section, we set up the navigation method of the front-end page, and then we will further add specific functions: user management
