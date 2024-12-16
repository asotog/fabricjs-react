import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import nodeExternals from 'rollup-plugin-node-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodeExternals(),
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/lib/**/*.ts', 'src/lib/**/*.tsx'],
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.tsx'),
      formats: ['es']
    },
    copyPublicDir: false
  }
})
