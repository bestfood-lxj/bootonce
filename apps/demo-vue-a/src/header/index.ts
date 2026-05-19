/**
 * @description upper entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { pToHtmlConf } from './elem-to-html'

import withParagraph from './plugin'
import { renderParagraphConf } from './render-elem'

const p: Partial<IModuleConf> = {
  renderElems: [renderParagraphConf],
  elemsToHtml: [pToHtmlConf],
  editorPlugin: withParagraph,
}

export default p
