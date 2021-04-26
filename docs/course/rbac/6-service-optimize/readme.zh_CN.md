---
order: 6
label: '6. 服务优化'
---

# 服务优化

上一节我们完成了用户管理的前后台功能，在教程的这个部分，我们提取一部分公共的功能：

- `api` 后台 `service` 和 `controller` 优化
- `ui` 前端的 `service` 优化

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/6-service-optimize" target="_blank">Github 地址</a>。

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

## 完善 UserController

我们进一步来优化 `user.controller.ts` :

{{ __4\__api:src/system/users/user.controller.ts:true:true }}

- 添加对应的 `ListUserDto` 和 `UpdateUserDto`，直接继承对应的 `User` 对象
- 使用 `plainToClass` 来做数据转换，比如我们并不希望 `User` 中的所有属性都输出出去，在 `ListUserDto` 中我们就排除了 `account` 属性

> 此处也可以通过封装 Repository 服务的方式来封装 Controller ，但是映射出来的 Swagger 就没有对应的参数说明了

## 前端添加通用的请求服务

在 `ui` 的项目中我们也添加一个 `repository.service.ts` 服务：

{{ __5\__ui:src/services/repository.service.ts:false:true }}

建立一个泛型类，提供通用的请求方法以及对应的接口参数。

然后修改对应的 `user.service.ts` 服务：

{{ __6\__ui:src/main/system/users/user.service.ts:false:true }}

## 下一步

在本节我们我们优化了前后台对接的服务功能，都是创建一个泛型类，然后通过继承的方式复用方法。
