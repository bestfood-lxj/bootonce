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
  const isLocal = () => icon.startsWith('svg-icon:');
  const symbolId = () => {
    return isLocal() ? `#icon-${icon.split('svg-icon:')[1]}` : icon;
  };
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
      isLocal()
        ? h(
          'svg',
          {
            attrs: {
              xmlns: 'http://www.w3.org/2000/svg',
              class: getSvgClass(),
              viewBox: '0 0 16 16',
              width: '16',
              height: '16',
            },
          },
          [
            h('path', {
              attrs: {
                fill: 'red',
                d: 'M4.66683 2.66683V1.3335H11.3335V2.66683H14.6668V4.00016H13.3335V14.0002C13.3335 14.3684 13.035 14.6668 12.6668 14.6668H3.3335C2.96531 14.6668 2.66683 14.3684 2.66683 14.0002V4.00016H1.3335V2.66683H4.66683ZM4.00016 4.00016V13.3335H12.0002V4.00016H4.00016ZM6.00016 6.00016H7.3335V11.3335H6.00016V6.00016ZM8.66683 6.00016H10.0002V11.3335H8.66683V6.00016Z',
              },
            }),
          ]
        )
        : h(
          'span',
          {
            attrs: {
              style: getIconifyStyle(),
            },
          },
          [
            h('span', {
              // dataset: { icon: symbolId() }
              attrs: { 'data-icon': symbolId() },
            }),
          ]
        ),
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
  SlateTransforms.insertNodes(
      editorRef.value,
      [{
        type: 'icon',
        icon: 'svg-icon:delete',
        size: 16,
        color: 'red',
        children: [{ text: '44' }], // inline void 节点必须有 children
      }],
      { at: SlateEditor.end(editorRef.value, []) }
    );
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
<style scoped lang="scss">
::v-deep() .el-icon {
  --color: inherit;
  align-items: center;
  display: inline-flex;
  height: 1em;
  justify-content: center;
  line-height: 1em;
  position: relative;
  width: 1em;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;

  svg {
    width: 1em;
    height: 1em;
  }
}
</style>