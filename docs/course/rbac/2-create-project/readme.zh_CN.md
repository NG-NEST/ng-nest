---
order: 2
label: '2. 创建项目'
---

# 创建项目

首先，我们新建一个 RBAC 的文件夹用来存放我们的 Angular 和 Nestjs 项目，并使用各自的 CLI 创建最初的应用程序。

在教程的这个部分，你将完成下列工作：

- 创建 Angular 项目并初始化
- 创建 Nestjs 项目并初始化

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/2-create-project" target="_blank">Github 地址</a>。

## 创建 Angular 项目

在我们创建的 RBAC 文件夹中打开命令行窗口程序，使用 `ng new ui --strict` 命令创建项目：

```info
--strict 用来指定严格模式。选择 SCSS 作为样式语言。
```

{{ __1\__bash:1.bash:false:false }}

Angular CLI 会安装必要的依赖包。这可能要花几分钟的时间，CLI 会在当前目录中创建一个 ui 的工作区。

执行以下命令运行 ui 项目：

{{ __1.1\__bash:1.1.bash:false:false }}

然后你会看到默认浏览器打开了 http://localhost:4200/ 页面，并显示如下：

{{ __1.2\__img:ui.png:false:false }}

## 创建 Nestjs 项目

同样在 RBAC 文件夹中打开命令行窗口程序，使用 `nest new api` 命令创建项目：

{{ __2\__bash:2.bash:false:false }}

Nestjs CLI 会安装必要的依赖包。这可能要花几分钟的时间，CLI 会在当前目录中创建一个 api 的工作区。

执行以下命令运行 api 项目：

{{ __2.1\__bash:2.1.bash:false:false }}

然后在浏览器中打开 http://localhost:3000/ 你会看到如下的文字：

{{ __2.2\__img:api.png:false:false }}

## 本节 CLI 命令的详细说明

- <a href="https://angular.cn/cli" target="_blank">Angular CLI</a>
- <a href="https://docs.nestjs.com/cli/overview" target="_blank">Nestjs CLI</a>

## 下一步

搭建前端的基本框架：[前端框架页](index/docs/zh_CN/course/rbac/3-ui-frame)
