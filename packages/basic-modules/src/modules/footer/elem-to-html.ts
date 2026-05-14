/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'
import { init, h, classModule, styleModule, eventListenersModule, attributesModule } from 'snabbdom'

function pToHtml(elem: Element, childrenHtml: string): string {
	const patchVue = init([attributesModule,classModule, styleModule, eventListenersModule,])
  if (childrenHtml === '') {
    return '<footer><br></footer>'
  }
  h("div", [
    h("svg", { attrs: { width: 100, height: 100 } }, [
      h("circle", {
        attrs: {
          cx: 50,
          cy: 50,
          r: 40,
          stroke: "green",
          "stroke-width": 4,
          fill: "yellow"
        }
      })
    ]),
    h("span", { style: { fontWeight: "bold" } }, "This is bold " + childrenHtml),
  ]);
  //return `<footer>${childrenHtml}</footer>`
}

export const pToHtmlConf = {
  type: 'bottom',
  elemToHtml: pToHtml,
}
