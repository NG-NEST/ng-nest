---
order: 2
label: '快速上手'
---

# 快速上手

> 开始前请搭建好环境，如何搭建环境请查看 [angular](https://angular.io/guide/setup-local) 官方教程。

运行 `ng --version` 来检查当前版本，最好不要低于以下版本号。

{{ ____bash:1.bash:false:false }}

## 1. 使用 Angular CLI 创建和初始化项目

打开命令行窗口程序，使用 `ng new my-app` 命令创建项目， `my-app` 为项目名称 。

```primary
此处请选择 SCSS 来做样式语言，暂不支持其它语言。
```

{{ __1\__bash:1.bash:false:false }}

Angular CLI 会安装必要的依赖包。这可能要花几分钟的时间，CLI 会在当前目录中创建一个工作区。

{{ __1\__my-app:src/index.html }}

## 2. 使用 npm 安装 @ng-nest/ui

转到工作区文件夹 `my-app` ，安装 `@ng-nest/ui` 。

{{ __2\__bash:1.bash:false:false }}

打开 `src/styles.scss` 文件添加公共样式。

{{ __2.1\__my-app:src/styles.scss:false }}

或者在 `angular.json` 中的 `projects/my-app/architect/build/options/styles` 属性中添加。

{{ __2.2\__my-app:angular.json:false }}

## 3. 添加组件使用

打开 `src/app/app.module.ts` 文件引入 `x-button` 组件模块。

{{ __3.1\__my-app:src/app/app.module.ts:false }}

```primary
所有的组件只支持单独引入，一次性引入所有组件会导致打包体积比较大。
```

打开 src/app/app.component.html 替换成以下的代码，并修改对应的 scss 样式。

{{ __3.2\__my-app:src/app/app.component.html }}

然后在 my-app 项目根目录下打开命令行工具使用 ng serve -o 来运行项目。

{{ __3\__bash:1.bash:false:false }}

然后你会看到默认浏览器打开了 http://localhost:4200/ 页面，并显示如下：

{{ __3\__img:1.png:false:false }}

## 下一步

恭喜！你已经成功把 `ng-nest` 的组件集成到项目中了。

要继续探索 `ng-nest` ，请选择以下选项之一：

- [教程：RBAC 权限系统](index/docs/ui/course/guide)，在本教程中，你将构建一个应用，用来管理用户和权限。
