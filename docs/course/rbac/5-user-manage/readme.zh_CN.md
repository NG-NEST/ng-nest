---
order: 5
label: '5. 用户管理'
---

# 用户管理

上一节我们完成了前端导航栏的创建，在教程的这个部分，你将完成下列工作：

- 使用 `nestjs` 对接 `mysql` 数据库
- 开发用户管理的 `api` 接口
- 开发用户管理的前端界面

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

{{ __4\__api:src/system/users/user.module.ts:true:true }}

- `core` 公共的类型定义、服务等
- `system` 系统管理里面的模块
- `users` 指用户管理的模块
- `user.controller.ts` 控制器，处理请求并响应客户端
- `user.entity.ts` 映射到数据库中的实体
- `user.module.ts` 模块，用来组织应用程序结构
- `user.service.ts` 服务

> 创建好的 `user.entity.ts` 后，可执行 `npm run start:dev` 来启动项目，在 `mysql` 中会自动生成对应的数据库表

## 定义公共的类型文件

在 `api/src/core/interfaces` 中创建以下文件：

{{ __5\__api:src/core/interfaces/result.interface.ts:true:true }}

- result.interface.ts 增删改查定义的通用结构
- id.interface.ts `id` 属性定义

在根目录下面的 `tsconfig.json` 添加一个 `paths` 的路径映射，方便引入对应的文件：

{{ __6\__api:tsconfig.json:false:true }}

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

{{ __16\__api:src/main.ts:false:true }}

## 添加用户列表页面

打开前端项目，这里我们使用 `table` 组件来创建我们的用户列表：

{{ __17\__ui:src/main/system/users/user.component.ts:true:true }}

- 在 `user.module.ts` 中添加 `XTableModule` 模块的引入
- 在 `user.component.html` 和 `uesr.component.ts` 中使用 `table` 组件
- `columns` 配置 `table` 列
- `data` 指定 `table` 显示数据，此处配置为一个返回类型为 `Observable` 可观察对象的函数

现在基本的 `table` 列表有了，我们接下来对接后台的接口，我们创建一个 `user.service.ts` 的服务：

{{ __18\__ui:src/main/system/users/user.service.ts:true:true }}

- 定义了用户管理中需要的基本请求服务
- 定义 `User` 的类型声明

> 此处使用了 `HttpClient`，需要在 `app.module.ts` 中添加 `HttpClientModule` 模块的引用

接下来替换 `user.component.ts` 中的 `data` 变量：

{{ __19\__ui:src/main/system/users/user.component.ts:false:true }}

然后我们把 `ui` 项目运行起来，使用 `ng serve` 来调试，然后可以看到如下的界面：

{{ __20\__img:20.png:false:false }}

此处发生一个请求的 404 的错误，我们把请求代理到 `api` 对应的地址：

{{ __21\__ui:proxy.conf.json:true:true }}

- 添加 `proxy.conf.json` 配置文件，把 `/api` 代理到我们 `api` 对应的 `http://localhost:3000`
- 更新 `package.json` 中的 `scripts > start` 为 `ng serve --proxy-config proxy.conf.json`

然后我们重新使用 `npm run start` 来启动 `ui` 项目，可以看到接口就能正常返回

## 添加用户详情页面

在 `users` 目录下面添加用户详情页面：

{{ __22\__ui:src/main/system/users/user.module.ts:true:true }}

- 路由配置中的 `type` 用来区分详情页面的类型，查看、新增和修改

在列表页面中我们添加一个新增的按钮，跳转到详情页新增：

{{ __23\__ui:src/main/system/users/user.component.html:true:true }}

接下来更新我们的详情页：

{{ __24\__ui:src/main/system/users/user-detail/user-detail.component.ts:true:true }}

- 使用 `Form` 组件来构建我们的表单
- 使用 `Message` 组件来弹出我们的消息框

最后我们更新我们的列表页面，添加查看、修改和删除的功能：

{{ __25\__ui:src/main/system/users/user.component.ts:true:true }}

- 使用模板的方式自定义我们 `table` 的操作列
- 使用 `MessageBox` 组件来做确认框

至此我们就完成用户管理最基本的增删改查功能：

{{ __26\__gif:26.gif:false:false }}

## 下一步

在本节我们完成了用户管理的基本功能，接下来我们进一步完善它：[服务优化](index/docs/zh_CN/course/rbac/6-service-optimize)
