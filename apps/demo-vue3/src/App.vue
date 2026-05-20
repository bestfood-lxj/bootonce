<template>
  <div class="page">
    <section class="panel">
      <header class="hero">
        <p class="eyebrow">apps/demo-vue3</p>
        <h1>wangEditor Vue 3 Demo</h1>
        <p class="summary">
          这是主仓库里的 Vue 3 示例源码，用来承接后续的在线模板同步。
        </p>
      </header>

      <div class="editor-shell">
        <div data-testid="editor-toolbar">
          <Toolbar
            style="border-bottom: 1px solid #d9e2f2"
            :editor="editorRef"
            :default-config="toolbarConfig"
            mode="default"
          />
        </div>
        <div data-testid="editor-textarea">
          <Editor
            style="height: 360px; overflow-y: hidden"
            v-model="html"
            :default-config="editorConfig"
            mode="default"
            @on-created="handleCreated"
            @on-change="handleChange"
          />
        </div>
      </div>
    </section>

    <aside class="panel output">
      <p class="eyebrow">HTML Output</p>
      <pre>{{ html }}</pre>
    </aside>
  </div>
</template>

<script lang="ts">
import '@wangeditor-next/editor/dist/css/style.css'

import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { Boot, SlateEditor, SlateTransforms, genPatchFn } from '@wangeditor-next/editor';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import { h,jsx, VNode } from 'snabbdom';
import { Element as SlateElement } from 'slate'
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  shallowRef,
} from 'vue'

const initialHtml = [
  '<h2>Vue 3 Demo</h2>',
  '<p>这个 demo 的源码位于 <code>apps/demo-vue3</code>。</p>',
  '<p>推荐把 StackBlitz 模板当成这里的派生产物，而不是反向维护。</p>',
].join('')
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
Boot.registerModule({renderElems: [renderParagraphConf],})
export default defineComponent({
  name: 'DemoVue3App',
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    const html = ref(initialHtml)
    const editorRef = shallowRef<IDomEditor | null>(null)
    const toolbarConfig: Partial<IToolbarConfig> = {}
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: '请输入内容...',
    }

    onBeforeUnmount(() => {
      const editor = editorRef.value

      if (editor == null) { return }
      editor.destroy()
    })

    const handleCreated = (createdEditor: IDomEditor) => {
      const globalWindow = window as unknown as { vue3Editor?: IDomEditor | null }

      editorRef.value = createdEditor
      globalWindow.vue3Editor = createdEditor
    }

    const handleChange = (changedEditor: IDomEditor) => {
      html.value = changedEditor.getHtml()
    }

    return {
      editorConfig,
      editorRef,
      handleChange,
      handleCreated,
      html,
      toolbarConfig,
    }
  },
})
</script>
