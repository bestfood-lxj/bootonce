/**
 * @description render upper elem
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode,h } from 'snabbdom'

/**
 * render upper elem
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
	let vnode = h("div", [
    h("svg", { attrs: { width: 100, height: 100 } }, [
      h("circle", {
        attrs: {
          cx: 50,
          cy: 50,
          r: 40,
          stroke: "blue",
          "stroke-width": 20,
          fill: "#EA4F16"
        }
      })
    ]),
    ...(children||[]),
  ]);
  console.log("basic-modules modules section render-elem.tsx:::",JSON.stringify(vnode))

  //const vnode = <section>{children}</section>
  return vnode
}

export const renderParagraphConf = {
  type: 'upper',
  renderElem: renderParagraph,
}
