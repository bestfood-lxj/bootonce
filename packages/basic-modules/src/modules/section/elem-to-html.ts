/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

function pToHtml(elem: Element, childrenHtml: string): string {
  if (childrenHtml === '') {
    return '<section><br></section>'
  }
  return `<section>${childrenHtml}</section>`
}

export const pToHtmlConf = {
  type: 'upper',
  elemToHtml: pToHtml,
}
