import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    "server": {
        "port": 5174,
        "proxy": {
            "/web.insumos": {
                target: "http://localhost:5000/",
                changeOrigin: true,
                rewrite: (path) => path.replace('/web.insumos', '/'),
            },
            "/api.insumos": {
                target: "http://localhost:5001/",
                changeOrigin: true,
                rewrite: (path) => path.replace('/api.insumos', '/'),
            }
        }
    }
})
