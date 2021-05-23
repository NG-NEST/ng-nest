---
order: 2
label: '2. Create Project'
---

# Create Project

First, we create a new RBAC folder for our Angular and Nestjs projects, and use the respective CLI to create the original application.

In this part of the tutorial, you will do the following:

- Create and initialize Angular projects
- Create and initialize the Nestjs project

Complete the code after this section:<a href="https://github.com/NG-NEST/ng-nest-examples/tree/master/RBAC/2-create-project" target="_blank">Github address</a>。

## Create Angular project

Open the command line window program in the RBAC folder we created and use the `ng new ui --strict` command to create the project:

```info
--strict used to specify strict schema, select SCSS as the style language.
```

{{ __1\__bash:1.bash:false:false }}

The Angular CLI installs the necessary dependency packages. This may take a few minutes, and the CLI will create a ui workspace in the current directory.

Execute the following command to run the ui project:

{{ __1.1\__bash:1.1.bash:false:false }}

You will then see the default browser open http://localhost:4200/ page and display the following:

{{ __1.2\__img:ui.png:false:false }}

## Create Nestjs project

Also open the command line window program in the RBAC folder and create the project using the `nest new api` command:

{{ __2\__bash:2.bash:false:false }}

The Nestjs CLI installs the necessary dependency packages. This may take a few minutes, and the CLI will create an api workspace in the current directory.

Execute the following command to run the api project:

{{ __2.1\__bash:2.1.bash:false:false }}

Then open http://localhost:3000/ in your browser and you will see the following text:

{{ __2.2\__img:api.png:false:false }}

## A detailed description of the CLI command in this section

- <a href="https://angular.cn/cli" target="_blank">Angular CLI</a>
- <a href="https://docs.nestjs.com/cli/overview" target="_blank">Nestjs CLI</a>

## Nest step

Build the basic framework of the front end：[UI Framework Page](index/docs/en_US/course/rbac/3-ui-frame)
