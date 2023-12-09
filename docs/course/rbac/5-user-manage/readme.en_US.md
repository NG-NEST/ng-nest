---
order: 5
label: '5. User Management'
---

# User Management

The last section we completed the creation of the front-end navigation bar, in this section of the tutorial, you will complete the following work:

- Using `Nestjs` docks `Mysql` database
- Develop user management interface
- Develop user management front end interface

Complete the code after this section:<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/5-user-manage" target="_blank">Github</a>。

> Before the start, you need to install the `mysql` database, useful to use the` mysql` version is `8.0.17`
> New RBAC's empty database

## Configure database connections

Open the `api` project created in Chapter 2, here we use the `Nestjs` connect the database (<a href = "https://docs.nestjs.com/techniques/Database" target = "_blank "> view </a>), execute the following command below to install dependencies under the root directory of the `api`

{{ __1\__bash:1.bash:false:false }}

- Typeorm is a node.js ORM framework

Next, create a `ormconfig.json` file below the root directory to configure the database connection:

{{ __2\__api:ormconfig.json:false:true }}

Modify the corresponding configuration: `host`: mysql address, `username`: connection account, `password`: connection password, `database`: database name.

Then import the corresponding `TypeormModule` module in` app.module.ts`

{{ __3\__api:src/app.module.ts:false:true }}

## Add file structure

Or in the `API` project, we add the following files to divide the modules through the folder:

{{ __4\__api:src/system/users/user.module.ts:true:true }}

- `core` specifically, service, etc.
- `system` system management inside the module
- `users` refers the module management of the user
- `user.controller.ts` controller, processing request and respond to the client
- `user.entity.ts` map entities in the database
- `user.module.ts` module, used to organize application structure
- `user.service.ts` service

> After creating a good `user.entity.ts`, you can execute the `npm run start:dev` to start the project, automatically generate the corresponding database table in `mysql`

## Define public type files

Create the following files in `api/src/core/interfaces`

{{ __5\__api:src/core/interfaces/result.interface.ts:true:true }}

- `result.interface.ts` increase the universal structure defined
- `id.interface.ts` `id` attribute definition

At the root directory `tsconfig.json` Add a path map of a `paths`, easy to introduce the corresponding file:

{{ __6\__api:tsconfig.json:false:true }}

## Add user management API interface

First we add users to the user's way of managing:

{{ __7\__api:src/system/users/user.service.ts:false:true }}

- `repository` used to manage users's warehousing, provide a series of operational data
- Added Curd's most basic five ways

Then map the method we created in the corresponding controller `user.controller.ts`:

{{ __8\__api:src/system/users/user.controller.ts:false:true }}

- `@Controller('users')` correspondence `/users`
- `@Get()`, `@Post()`, `@Put()`, `@delete()` represents their respective `http` request method

## Add a swagger module

`Swagger` module can be used to view / debug our creation interface, add the following two NPM packages in the project:

{{ __9\__bash:9.bash:false:false }}

Add `SwaggerModule` to `main.ts`:

{{ __10\__api:src/main.ts:false:true }}

Use `npm run start:dev` run API project:

{{ __11\__bash:11.bash:false:false }}

The project is successful, we open `http:// localhost:3000/api` in your browser to see the following screen:

{{ __12\__img:12.png:false:false }}

## DTO data transfer object

DTO is used to display data transfer between layers and service layers, we define a `CreateUserDto` data transfer object in` Users`

{{ __13\__api:src/system/users/dto/create-user.dto.ts:false:true }}

> `@ApiProperty` decorator can generate a corresponding attribute instructions in `swagger`

Here we first install two `npm`

{{ __14\__bash:14.bash:false:false }}

- `class-validator` provide a data verification method
- `class-transformer` provide data conversion method

In DTO, let's verify the data, such as verifying email, mobile phone number:

{{ __15\__api:src/system/users/dto/create-user.dto.ts:false:true }}

To make the above verification, you need to configure our validator in `main.ts`

{{ __16\__api:src/main.ts:false:true }}

## Add user list page

Open the front-end project, here we use the `table` component to create our list of users:

{{ __17\__ui:src/main/system/users/user.component.ts:true:true }}

- Adding a `XTableComponent` component in `user.module.ts`
- Using `table` components in `user.component.html` and `uesr.component.ts`
- `columns` configuration
- `data` specify the `table` display data, configure it to a return type to `Observable` Observe the function of the object

Now the basic `table` list, we will follow the interface interface, we create a service: `user.service.ts`

{{ __18\__ui:src/main/system/users/user.service.ts:true:true }}

- Define the basic request services required in user management
- Definition `User`

> Use the `HttpClient`, you need to add a reference to the `HttpClientModule` module in `app.module.ts`

Next to replace the `data` variable in `user.component.ts`

{{ __19\__ui:src/main/system/users/user.component.ts:false:true }}

Then we run the `ui` project, use the `ng serve` to debug, then you can see the following interface:

{{ __20\__img:20.png:false:false }}

A request 404 error occurs here, we put the request to the request to the API. The corresponding address:

{{ __21\__ui:proxy.conf.json:true:true }}

- Add a `proxy.conf.json` configuration file, put the `/api` agent to our `api`: `http://localhost:3000`
- Update `package.json` scripts `start` is `ng serve --proxy-config proxy.conf.json`

Then we reuse the `npm run start` to start the `ui` project, you can see the interface will return normally.

## Add user details page

Add a user details page below in `users` more details

{{ __22\__ui:src/main/system/users/user.module.ts:true:true }}

- Route configuration in `type` is used to distinguish the type, view, new and modified

In the list page we add a new button, jump to the details page Add:

{{ __23\__ui:src/main/system/users/user.component.html:true:true }}

Next update our details page:

{{ __24\__ui:src/main/system/users/user-detail/user-detail.component.ts:true:true }}

- Use the `form` component to build our form
- Use the `message` component to pop up our message box

Finally we update our list page, add the features of viewing, modifying, and deleting:

{{ __25\__ui:src/main/system/users/user.component.ts:true:true }}

- Use the template to customize our `table`
- Use the `MessageBox` component to confirm

To this end, we will complete the user management of the most basic increase in increasing and deduplication.

{{ __26\__gif:26.gif:false:false }}

## Next step

In this section, we have completed the basic functions of user management, followed by further improve it: [service optimization](index/docs/en_US/course/rbac/6-service-optimize)
