const fs = require("fs-extra");
const path = require("path");
const mdToHtml = require("./utils/md-to-html");
const parseDocMd = require("./utils/parse-doc-md");
const getFileName = require("./utils/get-file-name");
const firstLetterCapital = require("./utils/first-letter-capital");

const componentsPath = path.resolve(__dirname, "../../libraries/ng-moon/src/components");
const iconsPath = path.resolve(__dirname, "../../src/assets/icons");
const docsComponentsPath = path.resolve(__dirname, "../../src/main/docs/ui-bak");
const docsTemplatesPath = path.resolve(__dirname, "./templates/docs-ui-component");

const iconSource = {
  AntDesign: "ant-design",
  Eva: "eva",
  Feather: "feather",
  FontAwesome: "font-awesome",
  MaterialDesign: "material-design"
};

const iconSouceUrl = {
  adf: `${iconSource.AntDesign}/fill`,
  ado: `${iconSource.AntDesign}/outline`,
  adt: `${iconSource.AntDesign}/twotone`,
  eaf: `${iconSource.Eva}/fill`,
  eao: `${iconSource.Eva}/outline`,
  fto: `${iconSource.Feather}`,
  fab: `${iconSource.FontAwesome}/brands`,
  far: `${iconSource.FontAwesome}/regular`,
  fas: `${iconSource.FontAwesome}/solid`,
  md: `${iconSource.MaterialDesign}`
};

// clean dir
fs.emptyDirSync(docsComponentsPath);

// create component by readme.md
const componentsFolder = fs.readdirSync(componentsPath);
componentsFolder.forEach(dirName => {
  const readmePath = `${componentsPath}/${dirName}/readme.md`;
  let html = mdToHtml(readmePath);
  let iconsTemplate = "";
  if (html) {
    if (dirName === "icon") {
      // html += iconsTemplate(dirName).content;
      iconTemplate = iconsTemplateRe(dirName);
      html += iconTemplate.content;
    }
    docComponentHtml(html, `${docsComponentsPath}/components/${dirName}`, dirName, iconTemplate);
  }
});

// component doc
function docComponentHtml(doc, filePath, dirName, iconTemplate) {
  fs.ensureDirSync(filePath);

  // component html
  const examples = exampleTemlate(dirName);
  const api = apiTemplate(dirName);
  const styleParam = styleParamTemplate(dirName);
  let htmlTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.html`, "utf8")
    .replace(/{{ content }}/g, doc)
    .replace(/{{ examples }}/g, examples.content)
    .replace(/{{ api }}/g, api.content)
    .replace(/{{ styleParam }}/g, styleParam.content);
  // add examples
  fs.writeFileSync(path.join(filePath, `${dirName}.component.html`), htmlTemplate, "utf8");

  // component ts
  const tsTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-component.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName))
    .replace(
      /{{ param }}/g,
      paramCodes(examples.codes) +
        paramCodes(api.codes) +
        paramCodes(styleParam.codes) +
        (iconTemplate ? paramCodes(iconTemplate.codes) : "")
    );
  fs.writeFileSync(path.join(filePath, `${dirName}.component.ts`), tsTemplate, "utf8");

  // component module
  const moduleTemplate = fs
    .readFileSync(`${docsTemplatesPath}/doc-module.template.ts`, "utf8")
    .replace(/{{ component }}/g, dirName)
    .replace(/{{ componentName }}/g, firstLetterCapital(dirName));
  fs.writeFileSync(path.join(filePath, `${dirName}.module.ts`), moduleTemplate, "utf8");
}

// icons
function iconsTemplateRe(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/icon-component.template.html`, "utf8");
  const iconsFolder = fs.readdirSync(`${iconsPath}`);
  let list = [];
  iconsFolder.forEach(folder => {
    let item = { category: "", themes: [] };
    item.category = folder;
    const themesFolder = fs.readdirSync(`${iconsPath}/${folder}`);
    let themeObj = { cate: "", prefix: "", icons: [] };
    themesFolder.forEach(theme => {
      const themeFolder = `${iconsPath}/${folder}/${theme}`;
      if (fs.lstatSync(themeFolder).isDirectory()) {
        themeObj = { cate: "", prefix: "", icons: [] };
        themeObj.cate = theme;
        themeObj.prefix = getPrefix(`${folder}/${theme}`);
        const iconsFd = fs.readdirSync(`${themeFolder}`);
        iconsFd.forEach(fd => {
          themeObj.icons.push(getFileName(fd));
        });
        item.themes.push(themeObj);
      } else {
        themeObj.icons.push(getFileName(theme));
      }
    });
    if (themeObj.cate === "") {
      themeObj.prefix = getPrefix(`${folder}`);
      item.themes.push(themeObj);
    }
    list.push(item);
  });

  return {
    codes: [{ key: "allIcons", value: JSON.stringify(list), object: true }],
    content: template
  };
}

// icons
function iconsTemplate(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/icon-component.template.html`, "utf8");
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
          const rowCom = iconRowTemplate(name);
          menus += `<li>${parse.meta.title}</li>`;
          // codes = [...codes, { key: `ex${index}Code${index}`, value: rowCom.code }];
          contents += `<div class="row">${rowCom.content}</div>`;
        }
      }
    }
  });
  if (menus.length > 0) menus = `<ul class="menus">${menus}</ul>`;
  if (contents.length > 0) contents = `<div class="contents">${contents}</div>`;

  return {
    content: template.replace(/{{ menus }}/g, menus).replace(/{{ contents }}/g, contents)
  };
}

// param codes
function paramCodes(codes) {
  let params = "";
  if (codes && codes.length > 0) {
    codes.forEach(x => {
      params += x.object ? `${x.key} = ${x.value};\n` : `${x.key} = \`${x.value}\`;\n`;
    });
  }
  return params;
}

// examples
function exampleTemlate(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/example-component.template.html`, "utf8");
  const examplesPath = `${componentsPath}/${dirName}/examples`;
  let examplesFolder = fs.readdirSync(examplesPath);
  let menus = "";
  let contents = "";
  let codes = [];
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
          const rowCom = exConRowComTemplate(name, examPath, index);
          menus += `<li>${parse.meta.title}</li>`;
          codes = [...codes, { key: `ex${index}Code${index}`, value: rowCom.code }];
          contents += `<div class="row">${rowCom.content}</div>`;
        }
      }
    }
  });
  if (menus.length > 0) menus = `<ul class="menus">${menus}</ul>`;
  if (contents.length > 0) contents = `<div class="contents">${contents}</div>`;

  return {
    codes: codes,
    content: template.replace(/{{ menus }}/g, menus).replace(/{{ contents }}/g, contents)
  };
}

// examples-row
function exConRowComTemplate(name, examPath, index) {
  const code = fs.readFileSync(`${examPath}/${name}.html`, "utf8");
  let template = fs
    .readFileSync(`${docsTemplatesPath}/example-row-component.template.html`, "utf8")
    .replace(/{{ code }}/g, code)
    .replace(/{{ index }}/g, index)
    .replace(
      /{{ explain }}/g,
      parseDocMd(fs.readFileSync(`${examPath}/${name}.md`, "utf8")).content
    );

  return {
    code: code,
    content: template
  };
}

// icon-row
function iconRowTemplate(dirName) {
  const path = `${iconsPath}/${dirName}`;
  let folder = fs.readdirSync(path);
  let template = "";
  let isDirectory = false;
  folder.forEach((name, index) => {
    if (fs.lstatSync(`${path}/${name}`).isDirectory()) {
      isDirectory = true;
      let childrenFolder = fs.readdirSync(`${path}/${name}`);
      let cate = `<span>${name}</span>`;
      let cateTemp = "";
      childrenFolder.forEach((cname, cindex) => {
        cateTemp += iconLi(`${dirName}/${name}`, cname);
      });
      if (cateTemp.length > 0) cateTemp = `<ul class="icons">${cateTemp}</ul>`;
      template += cate + cateTemp;
    } else {
      template += iconLi(dirName, name);
    }
  });
  if (template.length > 0 && !isDirectory) template = `<ul class="icons">${template}</ul>`;

  return {
    content: template
  };
}

function iconLi(dirName, name) {
  let fileName = getFileName(name);
  return `
  <li>
    <nm-icon [nmType]="'${getPrefix(dirName)}-${fileName}'"></nm-icon>
    <span>${fileName}</span>
  </li>`;
}

// icon prefix
function getPrefix(dirName) {
  for (let key in iconSouceUrl) {
    if (iconSouceUrl[key] === dirName) {
      return key;
    }
  }
}

// api
function apiTemplate(dirName) {
  let template = fs.readFileSync(`${docsTemplatesPath}/api-component.template.html`, "utf8");
  let typeFile = fs.readFileSync(`${componentsPath}/${dirName}/nm-${dirName}.type.ts`, "utf8");
  let index = 1;
  let codes = [{ key: `api1Code1`, value: typeFile }];
  return {
    codes: codes,
    content: template.replace(/{{ index }}/g, index)
  };
}

// style param
function styleParamTemplate(dirName) {
  let template = fs.readFileSync(
    `${docsTemplatesPath}/style-param-component.template.html`,
    "utf8"
  );
  let typeFile = fs.readFileSync(`${componentsPath}/${dirName}/style/_param.scss`, "utf8");
  let index = 1;
  let codes = [{ key: `style1Code1`, value: typeFile }];
  return {
    codes: codes,
    content: template.replace(/{{ index }}/g, index)
  };
}
