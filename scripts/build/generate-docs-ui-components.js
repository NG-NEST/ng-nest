const fs = require("fs-extra");
const path = require("path");
const mdToHtml = require("./utils/md-to-html");
const parseDocMd = require("./utils/parse-doc-md");
const htmlEscape = require("./utils/html-escape");
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

// create component by readme.md
const componentsFolder = fs.readdirSync(componentsPath);
componentsFolder.forEach(dirName => {
  const readmePath = `${componentsPath}/${dirName}/readme.md`;
  let html = mdToHtml(readmePath);
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
    .replace(/{{ content }}/g, doc)
    .replace(/{{ examples }}/g, exampleTemlate(dirName));
  // add examples
  fs.writeFileSync(
    path.join(filePath, `${dirName}.component.html`),
    htmlTemplate,
    "utf8"
  );
  // console.log(htmlTemplate);

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
  let menus = "";
  let contents = "";
  examplesFolder.sort().forEach((dirName, index) => {
    let names = dirName.split(".");
    if (names.length > 1) {
      let name = names[1];
      const examPath = `${examplesPath}/${dirName}`;
      const mdPath = `${examPath}/${name}.md`;
      if (fs.existsSync(mdPath)) {
        let content = fs.readFileSync(mdPath, "utf8");
        if (content) {
          let parse = parseDocMd(content);
          menus += `<li>${parse.meta.title}</li>`;
          contents += `<div class="row">${exConRowComTemplate(
            name,
            examPath,
            index
          )}</div>`;
        }
      }
    }
  });
  if (menus.length > 0) menus = `<ul class="menus">${menus}</ul>`;
  if (contents.length > 0) contents = `<div class="contents">${contents}</div>`;

  return template
    .replace(/{{ menus }}/g, menus)
    .replace(/{{ contents }}/g, contents);
}

function exConRowComTemplate(name, examPath, index) {
  const code = fs.readFileSync(`${examPath}/${name}.html`, "utf8");
  let template = fs
    .readFileSync(
      `${docsTemplatesPath}/example-row-component.template.html`,
      "utf8"
    )
    .replace(/{{ code }}/g, code)
    .replace(/{{ codeEscape }}/g, htmlEscape(code))
    .replace(/{{ index }}/g, index)
    .replace(
      /{{ explain }}/g,
      parseDocMd(fs.readFileSync(`${examPath}/${name}.md`, "utf8")).content
    );

  return template;
  // if (files && files.length > 0) {
  //   let temp = new String(template);
  //   files.forEach(x => {

  //   });
  // }
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
