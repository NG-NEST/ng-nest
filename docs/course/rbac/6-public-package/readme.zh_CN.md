---
order: 6
label: '6. 公共功能封装'
---

# 公共功能封装

上一节我们完成了用户管理的前后台功能，在教程的这个部分，我们提取一部分公共的功能：

- `api` 后台 `service` 和 `controller` 抽象化
- `ui` 前端的 `service` 抽象化

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/6-public-package" target="_blank">Github 地址</a>。

## Repository 抽象类

我们先来观察一下 `api` 中的 `user.service.ts`：

{{ __1\__api:src/system/users/user.service.ts:false:true }}

先忽略方法里面的具体实现，针对每一个实体对象，我们都可以有这一套通用的增删改查的功能，接下来我们就可以创建一个抽象类来提取它们：

{{ __2\__api:src/core/services/repository.service.ts:true:true }}

- `Entity` 是一个泛型，它可以是我们之前的 `User` 或者其它的实体
- `Entity extends XId` 是一种类型限制，表示 `Entity` 中需要有 `XId` 的类型属性

然后我们就可以替换我们之前的 `user.service.ts`：

{{ __3\__api:src/core/services/repository.service.ts:false:true }}

- 通过 `extends` 来继承我们的抽象类
- 通过 `super` 初始化构造函数

## Controller 抽象类

## 下一步

在本节我们完成了用户管理的基本功能，接下来我们进一步完善它：公共功能封装
