/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

function pToHtml(elem: Element, childrenHtml: string): string {
  if (childrenHtml === '') {
    return '<footer><svg t="1778811522117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6133" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256"><path d="M846.933333 309.333333l-452.266666 452.266667a21.333333 21.333333 0 0 1-30.293334 0l-229.973333-229.973333a21.333333 21.333333 0 0 1 0-30.293334l29.866667-29.866666a21.333333 21.333333 0 0 1 30.293333 0l184.746667 184.746666 407.466666-407.466666a21.76 21.76 0 0 1 30.293334 0l29.866666 30.293333a21.333333 21.333333 0 0 1 0 30.293333z" p-id="6134"></path></svg></footer>'
  }
  return `<footer><svg t="1778811522117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6133" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256"><path d="M846.933333 309.333333l-452.266666 452.266667a21.333333 21.333333 0 0 1-30.293334 0l-229.973333-229.973333a21.333333 21.333333 0 0 1 0-30.293334l29.866667-29.866666a21.333333 21.333333 0 0 1 30.293333 0l184.746667 184.746666 407.466666-407.466666a21.76 21.76 0 0 1 30.293334 0l29.866666 30.293333a21.333333 21.333333 0 0 1 0 30.293333z" p-id="6134"></path></svg><div>${childrenHtml}</div></footer>`
}

export const pToHtmlConf = {
  type: 'bottom',
  elemToHtml: pToHtml,
}
