module.exports = function getFileName(file) {
  var pattern = /\.{1}[a-z]{1,}$/;
  if (pattern.exec(file) !== null) {
    return file.slice(0, pattern.exec(file).index);
  } else {
    return file;
  }
};
