/**
 * @description render bottom elem
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode,h } from 'snabbdom'

/**
 * render bottom elem
 * @param elemNode slate elem
 * @param children children
 * @param editor editor
 * @returns vnode
 */
function renderParagraph(
  elemNode: SlateElement,
  children: VNode[] | null,
  _editor: IDomEditor,
): VNode {
	return h("div", [
    h("svg", { attrs: { width: 100, height: 100 } }, [
      h("circle", {
        attrs: {
          cx: 50,
          cy: 50,
          r: 10,
          stroke: "green",
          "stroke-width": 4,
          fill: "yellow"
        }
      })
    ]),
    ...(children||[]),
  ]);

  //const vnode = <footer>{children}</footer>
  //return vnode
}

export const renderParagraphConf = {
  type: 'bottom',
  renderElem: renderParagraph,
}
