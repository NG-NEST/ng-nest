const MD = require("marked");
const fs = require("fs-extra");

module.exports = function mdToHtml(mdPath) {
  if (!fs.existsSync(mdPath)) return;
  return MD(fs.readFileSync(mdPath, "utf8"));
};
