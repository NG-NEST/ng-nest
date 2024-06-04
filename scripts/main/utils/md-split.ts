export function mdSplit(md: string) {
  // 匹配Markdown代码块
  const codeRegex = /```[\s\S]*?```/g;

  // 使用正则表达式匹配到的所有代码块
  const codeMatches: { type: string; content: string; language?: string }[] = [];
  let match;
  while ((match = codeRegex.exec(md)) !== null) {
    // 匹配到的第一个分组是语言标识符，第二个分组是代码内容
    const mat = /```([^\n]*)\n([\s\S]*?)\n```/.exec(match[0]);
    if (mat) {
      codeMatches.push({ type: 'code', language: mat[1], content: mat[2] });
    }
  }

  // 将Markdown分割为代码块和非代码块部分
  const parts = md.split(codeRegex);

  // 组合非代码块部分和代码块数组
  const result: { type: string; content: string; language?: string }[] = [];
  parts.forEach((part, index) => {
    result.push({ type: 'text', content: part.replace(/^\n+/, '').replace(/\n+$/, '') });
    if (index < codeMatches.length) {
      result.push(codeMatches[index]);
    }
  });

  return result;
}
