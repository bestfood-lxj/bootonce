import './style.css'
import { VNode,h } from 'snabbdom';
import { createApp } from 'vue'
import { Boot, SlateEditor, SlateTransforms, type IDomEditor } from '@wangeditor-next/editor';

import { Element as SlateElement } from 'slate'
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
          r: 30,
          stroke: "blue",
          "stroke-width": 8,
          fill: "red"
        }
      })
    ]),
    ...(children||[]),
  ]);
  console.log("basic-modules modules section render-elem.tsx:::",JSON.stringify(vnode))

  //const vnode = <section>{children}</section>
  return vnode
}
const renderParagraphConf = {
  type: 'upper',
  renderElem: renderParagraph,
}
const renderIcon = (elemNode: any) => {
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  let vnode= h("div", [
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
    ])
  ]);
  console.log("main .ts vnode renderIcon--",JSON.stringify(vnode))
  return vnode
}
Boot.registerModule({renderElems: [renderParagraphConf],})
Boot.registerModule({
  renderElems: [
    {
      type: 'bluec',
      renderElem: renderIcon,
    },
  ],
});


function renderAttachment(elem, children, editor) {   
  console.log("renderAttachment ......")
  console.log("renderAttachment ......")
  console.log("renderAttachment ......")
  console.log("renderAttachment ......")
  return  h("a", { props: { href: "/bar" } }, "I'll take you places!")
}
const renderElemConf = {
  type: 'attachment', // 新元素 type ，重要！！！
  renderElem: renderAttachment,
}
Boot.registerRenderElem(renderElemConf)


import App from './App.vue'

createApp(App).mount('#app')
