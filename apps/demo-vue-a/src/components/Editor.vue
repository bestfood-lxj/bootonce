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
import floatImageModule from '@wangeditor-next/plugin-float-image'
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}




Boot.registerModule(floatImageModule)

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    console.log(editorRef);
    editorRef.value.isVoid =(element) =>( ['aicon','attachment'].includes(element.type))
    var arg1 = editorRef.value;
    var arg2 = [
        {
          type: 'attachment',
          children: [{ text: '' }]
        },
        {
          type: 'aicon',
          icon: 'svg-icon:delete',
          size: 16,
          color: 'red',
          text: 'if (Node$1.isText(_node)) {',
          children: [{ text: '' }], // inline void 节点必须有 children
        },
        
        // {
        //   type: 'attachment'
        // },
        { type: 'bottom', children: [{ text: 'bottom is footer!!' }] },
        { type: 'paragraph', children: [{ text: 'SlateTransforms.insertNodes type:paragraph text ok!!' }] }
      ];
    var arg3 = { at: SlateEditor.end(editorRef.value, []) };
    SlateTransforms.insertNodes(arg1, arg2, arg3 );
  }, 2000)
});

const toolbarConfig = {};
const editorConfig = {
  placeholder: '请输入内容...',
  hoverbarKeys: {
    // 在编辑器中，选中链接文本时，要弹出的菜单
    link: {
      menuKeys: [ // 默认的配置可以通过 `editor.getConfig().hoverbarKeys.image` 获取
        'imageWidth30',
        'imageWidth50',
        'imageWidth100',
        '|',               // 分割符
        'imageFloatNone',  // 增加 '图片浮动' 菜单
        'imageFloatLeft',
        'imageFloatRight',
        '|',               // 分割符
        'editImage',
        'viewImageLink',
        'deleteImage',
      ],
    },
  },
};

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
