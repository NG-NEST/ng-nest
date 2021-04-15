---
order: 5
label: '5. 用户管理'
---

# 用户管理

上一节我们完成了前端导航栏的创建，在教程的这个部分，你将完成下列工作：

- 使用 `nestjs` 对接 `mysql` 数据库，开发用户管理的 `api` 接口

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/5-user-manage" target="_blank">Github 地址</a>。

> 开始前需要安装好 `mysql` 数据库，此处使用的 `mysql` 版本是 `8.0.17`
> 新建一个 rbac 的空数据库

## 配置数据库连接

打开在章节 2 中创建的 `api` 项目，此处我们使用 `nestjs` 中提供的方式来连接数据库（<a href="https://docs.nestjs.com/techniques/database" target="_blank">查看</a>），在 `api` 的根目录下面执行以下命令来安装依赖：

{{ __1\__bash:1.bash:false:false }}

- typeorm 是一个 node.js ORM 框架

接下来在根目录下面创建一个 `ormconfig.json` 文件来配置数据库连接：

{{ __2\__api:ormconfig.json:false:true }}

修改对应的配置：`host`：mysql 的地址，`username`：连接账号，`password`：连接密码，`database`：数据库名称。

然后在 `app.module.ts` 中导入对应的 `TypeOrmModule` 模块：

{{ __3\__api:src/app.module.ts:false:true }}

## 添加文件结构

还是在 `api` 项目中，我们添加以下文件，通过文件夹来划分模块：

{{ __4\__api:src/system/users/user.module.ts:false:true }}

- core 公共的类型定义、服务等
- system 系统管理里面的模块
- users 指用户管理的模块
- user.controller.ts 控制器，处理请求并响应客户端
- user.entity.ts 映射到数据库中的实体
- user.module.ts 模块，用来组织应用程序结构
- user.service.ts 服务

> 创建好的 `user.entity.ts` 后，可执行 `npm run start:dev` 来启动项目，在 `mysql` 中会自动生成对应的数据库表

## 定义公共的类型文件

在 `api/src/core/interfaces` 中创建以下文件：

{{ __5\__api:src/core/interfaces/result.interface.ts:false:true }}

- result.interface.ts 增删改查定义的通用结构
- id.interface.ts `id` 属性定义

在根目录下面的 `tsconfig.json` 添加一个 `paths` 的路径映射，方便引入对应的文件：

{{ __6\__api:tsconfig.ts:false:true }}

## 添加用户管理的 api 接口

首先我们在用户管理的服务 `user.service.ts` 中添加用户的操作方法：

{{ __7\__api:src/system/users/user.service.ts:false:true }}

- `repository` 用来管理用户的仓储，提供了一系列操作数据的方法
- 添加了 curd 最基本的 5 个方法

然后在对应的控制器 `user.controller.ts` 中把我们创建的方法映射出去：

{{ __8\__api:src/system/users/user.controller.ts:false:true }}

- `@Controller('users')` 对应路由 `/users`
- `@Get()`、`@Post()`、`@Put()` 和 `@Delete()` 表示各自的 `HTTP` 请求方法

## 添加 Swagger 模块

`Swagger` 模块可以用来查看/调试我们创建的接口，在项目中添加下面的两个 npm 包：

{{ __9\__bash:9.bash:false:false }}

然后在 `main.ts` 中添加模块 `SwaggerModule` 的配置：

{{ __10\__api:src/main.ts:false:true }}

使用 `npm run start:dev` 运行 api 项目：

{{ __11\__bash:11.bash:false:false }}

项目运行成功，我们在浏览器中打开 http://localhost:3000/api 可以看到如下的画面：

{{ __12\__img:12.png:false:false }}

## DTO 数据传输对象

DTO 用于展示层与服务层之间的数据传输，我们在 `users` 中定义一个 `CreateUserDto` 数据传输对象：

{{ __13\__api:src/system/users/dto/create-user.dto.ts:false:true }}

> `@ApiProperty` 装饰器可以在 `Swagger` 中生成对应的属性说明

此处我们先安装两个 `npm` 的包：

{{ __14\__bash:14.bash:false:false }}

- `class-validator` 提供数据验证的方法
- `class-transformer` 提供数据转换的方法

在 DTO 中我们来对数据做验证，比如验证邮箱，手机号：

{{ __15\__api:src/system/users/dto/create-user.dto.ts:false:true }}

要使上面的验证生效，还需要在 `main.ts` 中配置我们的验证器：

{{ __10\__api:src/main.ts:false:true }}

## 添加用户管理前端界面



## 下一步

在本节我们搭建起了前端页面的导航方式，接下来我们来进一步添加具体的功能：用户管理
