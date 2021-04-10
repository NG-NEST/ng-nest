export default {
  $schema: './node_modules/@angular/cli/lib/config/schema.json',
  version: 1,
  newProjectRoot: 'projects',
  projects: {
    demo: {
      root: '',
      sourceRoot: 'src',
      projectType: 'application',
      prefix: 'app',
      schematics: {
        '@schematics/angular:component': {
          style: 'scss'
        }
      },
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            outputPath: 'dist/demo',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'tsconfig.app.json',
            aot: true,
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['node_modules/@ng-nest/ui/style/core/index.css', 'src/styles.scss']
          },
          configurations: {
            production: {
              fileReplacements: [
                {
                  replace: 'src/environments/environment.ts',
                  with: 'src/environments/environment.prod.ts'
                }
              ],
              optimization: true,
              outputHashing: 'all',
              sourceMap: false,
              extractCss: true,
              namedChunks: false,
              aot: true,
              extractLicenses: true,
              vendorChunk: false,
              buildOptimizer: true,
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '2mb',
                  maximumError: '5mb'
                }
              ]
            }
          }
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          options: {
            browserTarget: 'demo:build'
          },
          configurations: {
            production: {
              browserTarget: 'demo:build:production'
            }
          }
        }
      }
    }
  },
  defaultProject: 'demo'
};
