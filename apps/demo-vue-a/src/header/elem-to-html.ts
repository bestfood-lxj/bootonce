/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

function pToHtml(elem: Element, childrenHtml: string): string {
  if (childrenHtml === '') {
    return '<header><br></header>'
  }
  return `<header>${childrenHtml}</header>`
}

export const pToHtmlConf = {
  type: 'upper',
  elemToHtml: pToHtml,
}
