---
order: 1
label: '1. Introduction'
default: true
---

# RBAC Introduction

In this tutorial, you'll build an application that manages users and permissions, and at the end you'll do the following:

- Basic frame page
- The login page
- Routing permissions
- Menu permissions
- Action permissions in the page
- Basic usage of modules, components, services, and routes in Angular
- Basic usage of modules, controllers, services, entities, and TypeORM in Nest

This entry-level app uses most of the components and will be implemented in a gradual manner.

After completing all the steps in this tutorial, the final application will look like this:<a href="http://adminui.ngnest.com/" target="_blank">Online example</a> | <a href="https://github.com/NG-NEST/ng-nest-admin" target="_blank">Github address</a>。

{{ __1\__ng-nest-admin:light.png }}

## Current environment

angular ^19.0.0 | nestjs ^7.0.0

Refer to the following address for environment installation:<a href="https://angular.cn/guide/setup-local" target="_blank">Angular</a> | <a href="https://docs.nestjs.com/" target="_blank">Nestjs</a>

## RBAC core function of permission system

Before writing the code, let's analyze the functions in the RBAC system:

- User management
- Role management
- Menu management
- Organization and management
- Permissions management (page access, menu and action permissions)

The entity relationship diagram is as follows:

{{ __2\__rbac:rbac.png:false:false }}

```info
There are three core related entities: user, role, permission, user role many-to-many relationship, role authority many-to-many relationship. Different roles set different permissions, different users set different roles, and different users have different permissions indirectly. According to the permissions, the menu and page access permissions owned by users are deduced.
```

## Next step

Start project setup：[Create Project](index/docs/en_US/course/rbac/2-create-project)
