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
        <Toolbar
          style="border-bottom: 1px solid #d9e2f2"
          :editor="editorRef"
          :default-config="toolbarConfig"
          mode="default"
        />
        <Editor
          style="height: 360px; overflow-y: hidden"
          v-model="html"
          :default-config="editorConfig"
          mode="default"
          @on-created="handleCreated"
          @on-change="handleChange"
        />
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


import { Boot, SlateEditor, SlateTransforms, type IDomEditor,IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue'
import { defineComponent, onBeforeUnmount, ref, shallowRef,onMounted} from 'vue'

function buildVNode() {
  return h("div", [
    h("a", { props: { href: "/foo" } }, "I'll take you places!"),
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
const initialHtml = [
  '<h2>Vue 3 Demo</h2>',
  '<p>这个 demo 的源码位于 <code>apps/demo-vue3</code>。</p>',
  '<p>推荐把 StackBlitz 模板当成这里的派生产物，而不是反向维护。</p>',
].join('')

export default defineComponent({
  name: 'DemoVue3App',
  components: { Editor, Toolbar },
  setup() {
    const html = ref(initialHtml)
    const editorRef = shallowRef()
    const toolbarConfig: Partial<IToolbarConfig> = {}
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: '请输入内容...',
    }
    Boot.registerModule({
      renderElems: [
        {
          type: 'sscc',
          renderElem: buildVNode,
        },
      ],
    });
    onMounted(() => {
      setTimeout(()=>{
        SlateTransforms.insertNodes(
          editorRef.value,
          [
            {
              type: 'sscc',
              icon: 'svg-icon:delete',
              size: 16,
              color: 'red',
              children: [{ text: '44' }], // inline void 节点必须有 children
            },
            { type: 'paragraph', children: [{ text: 'aaa' }] },
            { type: 'div', children: [{ text: 'aadda' }] },
          ],
          { at: SlateEditor.end(editorRef.value, []) }
        );
      })
    })
    onBeforeUnmount(() => {
      const editor = editorRef.value

      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: typeof Editor) => {
      editorRef.value = editor
    }

    const handleChange = (editor: typeof Editor) => {
      html.value = editor.getHtml()
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
