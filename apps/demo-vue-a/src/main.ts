import './style.css'
import { h } from 'snabbdom';
import { createApp } from 'vue'
import { Boot, SlateEditor, SlateTransforms, type IDomEditor } from '@wangeditor-next/editor';

const renderIcon = (elemNode: any) => {
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  console.log('run r............................') 
  return h("div", [
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
}
Boot.registerModule({
  renderElems: [
    {
      type: 'aicon',
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
