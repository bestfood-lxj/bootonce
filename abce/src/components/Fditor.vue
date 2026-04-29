<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script>
import '@wangeditor-next/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Boot, SlateEditor, SlateTransforms, } from '@wangeditor-next/editor';
import { Editor, Toolbar,  } from '@wangeditor-next/editor-for-vue'
import { h } from 'snabbdom';

export default {
  components: { Editor, Toolbar },
  setup() {

    const renderIcon = (elemNode: any) => {
      const {
        icon,
        size = 16,
        color = 'inherit',
        svgClass = '',
        onClick = () => { },
      } = elemNode;
      return h(
        'i',
        {
          attrs: {
            class: 'el-icon v-icon',
            contenteditable: false,
            style: `font-size: ${size}px;color: ${color}`,
          },
          props: {
            onClick: onClick,
          },
        },
      )
    }
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    Boot.registerModule({
      renderElems: [
        {
          type: 'icon',
          renderElem: renderIcon,
        },
      ],
    });

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        const node1 = { type: 'paragraph', children: [{ text: 'aaa' }] }
        const node2 = { type: 'paragraph', children: [{ text: 'bbb' }] }
        const nodeList = [node1, node2]

        
        console.log(editorRef.value,editorRef)
        setTimeout(() => {
          SlateTransforms.insertNodes(
            editorRef.value, 
            nodeList,
            { at: SlateEditor.end(editorRef.value, []) }
          )
            //valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>