/**
 * 去除HTML标签
 */
 export function stripTags(text: string, ...usefulTags: any[]): string {
    if (!text || typeof (text) !== 'string')
        return text;
    return usefulTags.length > 0
        ? text.replace(new RegExp(`<(?!\/?(${usefulTags.join('|')})\s*\/?)[^>]+>`, 'g'), '')
        : text.replace(/<(?:.|\s)*?>/g, '');
}
