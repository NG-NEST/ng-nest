---
order: 3
label: '3. 前端框架页'
---

# 前端框架页

在上一节我们创建了一个 Angular 项目，我们从此项目开始。在教程的这个部分，你将完成下列工作：

- Angular 路由的使用（一级路由、二级路由）
- 框架页的创建（头部、侧边栏、标签页、内容等组件创建）

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/3-ui-frame" target="_blank">Github 地址</a>。

## 一级路由 - 框架页路由

首先创建我们的框架页模块，使用 CLI 的命令来创建模块和对应的组件：

{{ ____bash:1.bash:false:false }}

我们在 ui/src 下面建立一个 layout 的文件夹，把通过 CLI 创建的 src/app/index 模块移动到此文件夹下面。

```info
新建的 layout 文件夹用来放框架页模块，后期可能会存在多个框架页的情况。
```

接下来设置我们的 index 框架页路由，修改 app-routing.module.ts 文件：

{{ __1\__ui:src/app/app-routing.module.ts:false:true }}

- 此处都使用惰性加载，即访问到此路由的时候才去加载模块对应的 js 文件，详情：<a href="https://angular.cn/guide/router#lazy-loading-route-configuration" target="_blank">惰性加载路由配置</a>

接下来还要设置 index 模块中的路由配置：

{{ __2\__ui:src/layout/index/index.module.ts:false:true }}

- 把默认路由指向我们的 index 组件，此处会带上当前模块的路由，比如 http://locahost:4200/index 对应的就是 index 组件

最后打开根组件 app.component.html，修改如下：

{{ __3\__ui:src/app/app.component.html:false:true }}

- router-outlet 标签，一级路由出口，加载的路由组件将会显示在此标签下面。

路由更多知识查看官网：<a href="https://angular.cn/guide/router" target="_blank">路由与导航</a>

## 创建框架页中子组件

在 index 模块中创建以下子组件：

- content 内容页
- crumb 面包屑
- header 头部 logo
- sidebar 导航菜单
- tabs 标签页

新增修改文件如下：

{{ __4\__ui:src/layout/index/index.component.html:true:true }}

使用 `ng serve -o` 运行你会得到如下的界面:

{{ __5\__img:index.png:false:false }}

## 创建二级路由 - 业务模块路由

首先二级路由的内容我们会显示在 content 中，对应我们具体的业务模块，现在我们来创建 2 个模块：

在 src 下面新建一个 main 文件夹，并创建 home 和 dashboard 模块，如下：

{{ __6\__ui:src/main/home/home.module.ts:true:true }}

此处还修改了以下代码：

- 在 home 和 dashboard 对应的 module 文件中配置子路由
- 在 index.module.ts 中的路由配置中添加 children 属性，并添加 home 和 dashboard 的路由配置
- 在 content.component.html 中添加二级路由的出口

接下来我们再加个小功能，通过点击链接切换 home 和 dashboard 页面。打开 sidebar.component.html 文件修改如下：

{{ __7\__ui:src/layout/index/sidebar/sidebar.component.html:false:false }}

然后你会得到如下的界面，并且通过链接可以切换 content 中的内容。

{{ __8\__gif:sidebar.gif:false:false }}

## 功能优化

到此本节的功能基本已实现，路由的配置可能有点繁琐，我们来优化一下，提取一级、二级的路由配置到公共的文件中：

{{ __9\__ui:src/environments/routes.ts:true:true }}

## 下一步

在本节我们搭建起了前端的基本框架，实现了路由跳转配置。接下来我们来给这个基本框架中添加各种功能：侧边导航栏制作
