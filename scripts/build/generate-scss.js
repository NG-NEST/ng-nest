const fs = require("fs-extra");
const path = require("path");

const sourcePath = path.resolve(__dirname, "../../projects/ng-moon/src");
const targetPath = path.resolve(__dirname, "../../dist/ng-moon");

const targetFolder = fs.readdirSync(targetPath);
let componentsScssContent = "";
targetFolder.forEach(dir => {
  if (fs.existsSync(`${sourcePath}/${dir}/style/index.scss`)) {
    componentsScssContent += `@import "./${path.posix.join(
      dir,
      "style",
      "index.scss"
    )}";\n`;
    fs.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
  }
});
fs.copySync(
  path.resolve(sourcePath, "style"),
  path.resolve(targetPath, "style")
);
fs.writeFileSync(`${targetPath}/components.scss`, componentsScssContent);
fs.writeFileSync(
  `${targetPath}/ng-moon.scss`,
  fs.readFileSync(`${sourcePath}/ng-moon.scss`)
);
