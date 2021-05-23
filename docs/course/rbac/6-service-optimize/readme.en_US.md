---
order: 6
label: '6. Service Optimize'
---

# Service Optimize

In the previous section we completed the front and back function of the user management, in this section of the tutorial, we extracted a part of the public function:

- `api` background `service` and `controller` Optimization
- `ui` front `service`

Complete the code after this section:<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/6-service-optimize" target="_blank">Github</a>。

## Repository abstract class

Let's take a look at the `user.service.ts` in the `api`.

{{ __1\__api:src/system/users/user.service.ts:false:true }}

First ignore the specific implementation in the method, for each entity object, we can have this universal to dedup the functions. Next we can create an abstract class to extract them:

{{ __2\__api:src/core/services/repository.service.ts:true:true }}

- `Entity` is a generic, it can be our previous `User` or other entity
- `Entity extends XId` is a type limit, indicating that there is a type of `XID` in `Entity`

Then we can replace our previous `user.service.ts`:

{{ __3\__api:src/system/users/user.service.ts:false:true }}

- Inheriting our abstract class by `extends`
- Initialization constructor via `super`

## Perfect UserController

We will further optimize `user.controller.ts` :

{{ __4\__api:src/system/users/user.controller.ts:true:true }}

- Add corresponding `ListUserDto` and `UpdateUserDto`, directly inherit the corresponding `User` object
- Using `plainToClass` to do data conversion, such as we don't want all attributes in `User` to output out, in `ListUserdto`, we exclude `account` attribute

> Here, the Controller can be encapsulated by encapsulating the Repository service, but the mapped swagger does not have a corresponding parameter.

## Front end adds universal request service

In the `ui`, we also added a `repository.service.ts` service:

{{ __5\__ui:src/services/repository.service.ts:false:true }}

Establish a generic class to provide a generic request method and the corresponding interface parameters.

Then modify the corresponding `user.service.ts` service:

{{ __6\__ui:src/main/system/users/user.service.ts:false:true }}

## Next step

In this section, we have optimized the service function of the front and back and back, which is created a generic class and then multiplexing the method by inheriting.
