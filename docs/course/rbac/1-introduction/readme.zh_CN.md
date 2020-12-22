---
order: 1
label: '1. 简介'
---

# RBAC 简介

在本教程中，你将构建一个应用，用来管理用户和权限，在最后你将完成以下工作：

- 基本框架页
- 登录页
- 路由权限
- 菜单权限
- 页面中的操作权限
- Angular 中模块、组件、服务和路由的基本用法
- Nest 中模块、控制器、服务、实体以及 TypeORM 的基本用法

这个入门级 app 使用了大部分的组件，将会采取渐进式的方式来逐一实现。

完成本教程的所有步骤之后，最终的应用会是这样的：<a href="http://adminui.ngnest.com/" target="_blank">在线例子</a> | <a href="https://github.com/NG-NEST/ng-nest-admin" target="_blank">Github 地址</a>。

{{ __1\__ng-nest-admin:light.png }}

## 当前环境

angular ^11.0.0 | nestjs ^7.0.0

环境安装参考以下地址：<a href="https://angular.cn/guide/setup-local" target="_blank">Angular</a> | <a href="https://docs.nestjs.com/" target="_blank">Nestjs</a>

## RBAC 权限系统的核心功能

在写代码前我们分析一下 RBAC 系统中的功能：

- 用户管理
- 角色管理
- 菜单管理
- 组织管理
- 权限管理（页面访问权限、菜单权限和操作权限）

实体关系图如下：

{{ __2\__rbac:rbac.png:false:false }}

```info
核心相关的实体就三个，用户、角色、权限，用户角色多对多关系，角色权限多对多关系。不同的角色设置不同的权限，不同的用户设置不同的角色，间接达成不同的用户拥有不同的权限，根据权限推出用户拥有的菜单和页面访问权限。
```

## 下一步

开始项目的搭建：[创建项目](index/docs/zh_CN/course/rbac/2-create-project)
