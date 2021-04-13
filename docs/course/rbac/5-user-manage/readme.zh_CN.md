---
order: 5
label: '5. 用户管理'
---

# 用户管理

上一节我们完成了前端导航栏的创建，在教程的这个部分，你将完成下列工作：

- 使用 nestjs 对接 mysql 数据库，开发用户管理的 api 接口

完成本节后的代码：<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/5-user-manage" target="_blank">Github 地址</a>。

> 开始前需要安装好 mysql 数据库，此处使用的 mysql 版本是 8.0.17。

## 配置数据库连接

打开在章节 2 中创建的 api 项目，此处我们使用 nestjs 中提供的方式来连接数据库（<a href="https://docs.nestjs.com/techniques/database" target="_blank">查看</a>），在 api 的根目录下面执行以下命令来安装依赖：

{{ __1\__bash:ormconfig.json:false:false }}

- typeorm 是一个 node.js ORM 框架

接下来在根目录下面创建一个 `ormconfig.json` 文件来配置数据库连接：

{{ __2\__api:ormconfig.json:false:true }}

修改对应的配置：`host`：mysql 的地址，`username`：连接账号，`password`：连接密码，`database`：数据库名称。

然后在 api/src/app.module.ts 中导入对应的 TypeOrmModule 模块：

{{ __3\__api:src/app.module.ts:false:true }}

## 添加文件结构

还是在 api 项目中，我们添加以下文件，通过文件夹来划分模块：

{{ __4\__api:src/system/users/user.module.ts:false:true }}

- core 公共的类型定义、服务等
- system 系统管理里面的模块
- users 指用户管理的模块
- user.controller.ts 控制器，用来配置路由
- user.entity.ts 映射到数据库中的实体
- user.module.ts 模块，用来组织应用程序结构
- user.service.ts 服务

## 定义公共的类型文件

在 api/src/core/interfaces 中创建以下文件：

{{ __5\__api:src/core/interfaces/result.interface.ts:false:true }}

- result.interface.ts 增删改查定义的通用结构
- id.interface.ts `id` 属性定义

## 添加用户管理的 api 接口



## 下一步

在本节我们搭建起了前端页面的导航方式，接下来我们来进一步添加具体的功能：用户管理
