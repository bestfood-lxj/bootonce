import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: { 
  	open: false,
  	// hmr: {
	  //   clientPort: 443
	  // }
	  hmr: false,
  },
})
