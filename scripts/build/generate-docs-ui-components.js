const fs = require("fs-extra");
const path = require("path");
const mdToHtml = require("./utils/mdToHtml");
const firstLetterCapital = require("./utils/first-letter-capital");

const componentsPath = path.resolve(
  __dirname,
  "../../libraries/ng-moon/src/components"
);
const docsComponentsPath = path.resolve(
  __dirname,
  "../../src/main/docs/ui-bak"
);
const docsTemplatesPath = path.resolve(
  __dirname,
  "./templates/docs-ui-component"
);

// clean dir
fs.emptyDirSync(docsComponentsPath);

//
const componentsFolder = fs.readdirSync(componentsPath);
componentsFolder.forEach(dirName => {
  const readmePath = `${componentsPath}/${dirName}/readme.md`;
  let html = mdToHtml(
    readmePath,
    `${docsComponentsPath}/components/${dirName}/${dirName}.component.html`
  );
  if (html) {
    docComponentHtml(
      html,
      `${docsComponentsPath}/components/${dirName}`,
      dirName
    );
  }
});

function docComponentHtml(doc, filePath, dirName) {
  fs.ensureDirSync(filePath);

  // component html
  let htmlTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.html`, "utf8")
    .replace(/{{ content }}/g, doc);
  // add examples
  htmlTemplate += `<h2>示例代码</h2>` + exampleTemlate(dirName);
  fs.writeFileSync(
    path.join(filePath, `${dirName}.component.html`),
    htmlTemplate,
    "utf8"
  );

  // component ts
  const tsTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName));
  fs.writeFileSync(
    path.join(filePath, `${dirName}.component.ts`),
    tsTemplate,
    "utf8"
  );

  // component module
  const moduleTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-module.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName));
  fs.writeFileSync(
    path.join(filePath, `${dirName}.module.ts`),
    moduleTemplate,
    "utf8"
  );
}

function exampleTemlate(dirName) {
  let template = fs.readFileSync(
    `${docsTemplatesPath}/example-component.template.html`,
    "utf8"
  );
  const examplesPath = `${componentsPath}/${dirName}/examples`;
  let examplesFolder = fs.readdirSync(examplesPath);
  examplesFolder.sort().forEach(dirName => {
    console.log(dirName);
  });
}
// fs.copySync(
//   path.resolve(sourcePath, "style"),
//   path.resolve(targetPath, "style")
// );
// fs.writeFileSync(`${targetPath}/components.scss`, componentsScssContent);
// fs.writeFileSync(
//   `${targetPath}/ng-moon.scss`,
//   fs.readFileSync(`${sourcePath}/ng-moon.scss`)
// );
