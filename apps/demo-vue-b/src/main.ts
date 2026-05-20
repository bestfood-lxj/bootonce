import './style.css'
import { h } from 'snabbdom';
import { createApp } from 'vue'
import { Boot, SlateEditor, SlateTransforms, type IDomEditor } from '@wangeditor-next/editor';
import floatImageModule from '@wangeditor-next/plugin-float-image'
import wangEditorUpperModule from './section'

Boot.registerModule(wangEditorUpperModule)




//Boot.registerModule(floatImageModule)
import App from './App.vue'

createApp(App).mount('#app')
