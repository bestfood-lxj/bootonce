/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

function pToHtml(elem: Element, childrenHtml: string): string {
  if (childrenHtml === '') {
    return '<footer><br></footer>'
  }
  return `<footer>${childrenHtml}</footer>`
}

export const pToHtmlConf = {
  type: 'bottom',
  elemToHtml: pToHtml,
}
