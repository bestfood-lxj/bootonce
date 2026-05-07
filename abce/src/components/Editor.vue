<template>
  <div>
    <div>
      <button @click="insertText">insert text</button>
      <button @click="printHtml">print html</button>
      <button @click="disable">disable</button>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="default"
        style="border-bottom: 1px solid #ccc" />
      <Editor :defaultConfig="editorConfig" mode="default" v-model="valueHtml" @on-created="handleCreated"
        style="height: 400px; overflow-y: hidden" />
    </div>
    <div style="margin-top: 10px">
      <textarea v-model="valueHtml" readonly style="width: 100%; height: 200px; outline: none"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor-next/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Boot, SlateEditor, SlateTransforms, type IDomEditor } from '@wangeditor-next/editor';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue';
import { h } from 'snabbdom';
import { type Descendant } from "slate"
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

type Icon = {
  type: 'icon'
  icon: string
  size?: number
  color?: string
  svgClass?: string
  onClick?: () => void
  children: Descendant[]
}

declare module 'slate' {
  interface CustomTypes {
    Element: Icon
  }
}
const renderIcon = (elemNode: any) => {
  const {
    icon,
    size = 16,
    color = 'inherit',
    svgClass = '',
    onClick = () => { },
  } = elemNode;

  const getIconifyStyle = () => {
    const style = {
      'font-size': `${size}px`,
      height: '1em',
      color,
    };
    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');
  };
  const getSvgClass = () => {
    return `iconify ${svgClass ?? ''}`;
  };
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
    [
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
    ]
  );
};
Boot.registerModule({
  renderElems: [
    {
      type: 'icon',
      renderElem: renderIcon,
    },
  ],
});
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(()=>{
    SlateTransforms.insertNodes(
      editorRef.value,
      [
        {
          type: 'icon',
          icon: 'svg-icon:delete',
          size: 16,
          color: 'red',
          children: [{ text: '44' }], // inline void 节点必须有 children
        },
        { type: 'paragraph', children: [{ text: 'aaa' }] },
      ],
      { at: SlateEditor.end(editorRef.value, []) }
    );
  },2000)
  
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

const insertText = () => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.insertText('hello world');
};

const printHtml = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};

const disable = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.disable();
};

</script>
