---
order: 3
label: '3. UI Framework Page'
---

# UI Framework Page

In the last section we created an Angular project from which we started. In this part of the tutorial, you will do the following:

- Use of Angular routing (first level, second level)
- Creation of frame pages (creation of header, sidebar, TAB, content, etc.)

Complete the code after this section:<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/3-ui-frame" target="_blank">Github 地址</a>。

## First-level routing - Frame page routing

First create our frame page module, using the CLI command to create the module and its corresponding components:

{{ ____bash:1.bash:false:false }}

We will create a layout folder under ui/src and move the src/app/index module created by CLI under this folder.

```info
The new layout folder is used for the frame page module. There may be more than one frame page later.
```

Next, set the route of our index frame page and modify the app-routing.module.ts file:

{{ __1\__ui:src/app/app-routing.module.ts:false:true }}

- Lazy loading is used here, that is, the js file corresponding to the module is loaded only when the route is accessed. Details:<a href="https://angular.io/guide/router#lazy-loading-route-configuration" target="_blank">Lazy load routing configuration</a>.

The next step is to set the routing configuration in the Index module:

{{ __2\__ui:src/layout/index/index.module.ts:false:true }}

- The default routing to our index components, here will take current routing module, such as http://locahost:4200/index is the corresponding index component.

Finally, open the root component app.component.html and modify it as follows:

{{ __3\__ui:src/app/app.component.html:false:true }}

- router-outlet label, a first-level routing exit, under which the loaded routing components will be displayed.

More information about routing:<a href="https://angular.io/guide/router" target="_blank">Routing and navigation</a>

## Create the frame page neutron component

Create the following subcomponents in the Index module:

- Content content page
- Crumb crumbs
- Header header logo
- Sider navigation menu
- Tabs

The revised document is as follows:

{{ __4\__ui:src/layout/index/index.component.html:true:true }}

Run `ng serve-o` and you'll get the following interface:

{{ __5\__img:index.png:false:false }}

## Create secondary routing-business module routing

First of all, the content of the secondary route will be displayed in the content, corresponding to our specific business module. Now let's create two modules:

Create a new main folder under src and create the home and dashboard modules as follows:

{{ __6\__ui:src/main/home/home.module.ts:true:true }}

The following code has also been modified here:

- Configure subpaths in the module files corresponding to home and dashboard
- Add the children property to the routing configuration in index.module.ts, and add the routing configuration for home and dashboard
- Add the exit for the secondary route in content.component.html

Let's add a little feature to switch between the home and dashboard pages by clicking on the link. Open the sidebar.component.html file and modify it as follows:

{{ __7\__ui:src/layout/index/sidebar/sidebar.component.html:false:false }}

You'll then get the following interface, and you'll be able to switch content with a link.

{{ __8\__gif:sidebar.gif:false:false }}

## Function optimization

The function of this section has been basically realized, and the configuration of route may be a little tedious. Let's optimize it and extract the first-level and second-level route configuration into the common file:

{{ __9\__ui:src/environments/routes.ts:true:true }}

## Next step

In this section, we set up the basic framework of the front end and realized the route jump configuration. Let's add a variety of features to this basic framework: Navigation.
