const YFM = require("yaml-front-matter");

module.exports = function fileToCode(file) {
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  delete meta.__content;

  const remark = require("remark")();
  const ast = remark.parse(content);
  let constr = "";

  console.log(ast)
  for (let i = 0; i < ast.children.length; i++) {

    const child = ast.children[i];
    console.log(remark.stringify(child))
    constr += remark.stringify(child, { });
  }
  return {
    meta: meta,
    content: constr
  };
};
