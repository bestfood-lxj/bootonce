/**
 * @description upper entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'


import { renderParagraphConf } from './render-elem'

const p: Partial<IModuleConf> = {
  renderElems: [renderParagraphConf],

}

export default p
