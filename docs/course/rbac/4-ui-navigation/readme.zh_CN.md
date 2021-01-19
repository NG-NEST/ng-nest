---
order: 4
label: '4. 导航栏'
---

# 导航栏

上一节我们完成了前端框架页的创建，在教程的这个部分，你将完成下列工作：

- 使用 `x-menu` 组件来创建侧边导航
- 使用 `x-slider` 组件来创建标签页导航
- 使用 `x-crumb` 组件来创建面包屑导航

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/4-ui-navigation" target="_blank">Github 地址</a>。

## 安装 @ng-nest/ui

安装 @ng-nest/ui 可以查看 <a href="https://ngnest.com/index/docs/zh_CN/ui/getting-started" target="_blank">快速上手</a>

## 添加侧边导航

此处使用菜单 <a href="https://ngnest.com/index/docs/zh_CN/ui/components/menu" target="_blank">x-menu</a> 组件来创建侧边导航，布局方式使用 column。

打开 `ui/src/layout/index/sidebar/sidebar.component.html` 文件，修改如下：

{{ __1\__ui:src/layout/index/sidebar/sidebar.component.html:false:false }}

对应的 `ui/src/layout/index/sidebar/sidebar.component.ts` 中 `data` 配置为可订阅的对象

{{ __2\__ui:src/layout/index/sidebar/sidebar.component.ts:false:false }}

对应创建一个 `index.service.ts` 服务来定义菜单数据

{{ __3\__ui:src/layout/index/index.service.ts:false:true }}

此处还配置了系统管理中的模块路由，对应在 `ui/src/main/system` 下面建立对应的模块文件：

- users 用户管理
- roles 角色管理
- organization 组织管理
- menus 菜单管理

{{ __4\__ui:src/environments/routes.ts:true:true }}

{{ __5\__gif:menus.gif:false:false }}

## 添加标签页导航

顶部的标签页 `tabs` 可以用监听路由的方式创建，此处用滑动菜单 <a href="https://ngnest.com/index/docs/zh_CN/ui/components/menu" target="_blank">x-slider</a> 组件来创建。

打开 `ui/src/layout/index/tabs/tabs.component.html` 文件，修改如下：

{{ __6\__ui:src/layout/index/tabs/tabs.component.html:false:false }}

此处使用 `slider` 组件提供的模板自定义功能来显示菜单内容。对应的 `tabs.component.ts` 文件修改如下：

{{ __7\__ui:src/layout/index/tabs/tabs.component.ts:false:false }}

- `activatedIndex` 对应当前激活的标签页
- `showClose` 显示标签页的关系按钮
- `indexChange()` 标签页变化事件，点击标签页的时候跳转路由
- `close()` 关闭标签页的事件

对应的 IndexService 服务修改如下：

{{ __8\__ui:src/layout/index/index.service.ts:false:true }}

- 添加 `tabs` 来存储标签页数据
- 添加 `session` 来存储当前页面、子页面和参数数据
- 在构造函数中使用 `Router` 提供的 `events` 事件来监听路由跳转结束事件，用来设置标签页数据
- `setTabs()` 根据当前地址栏数据对比 `menus` 数据来构建标签页数据
- `getUrl()` 地址栏字符串数据转化成对象

此处修改的还有样式文件，以及对应的模块引入文件：

{{ __9\__ui:src/layout/index/index.component.scss.ts:true:true }}

{{ __10\__gif:tabs.gif:false:false }}
