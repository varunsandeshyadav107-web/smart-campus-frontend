import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const artifactImg = 'C:\\Users\\varun\\.gemini\\antigravity-ide\\brain\\34813652-8000-403d-8465-9516b30e6c9b\\college_campus_1791743048135.jpg'
const targetImg = path.join(__dirname, 'public', 'campus.jpg')

try {
  if (fs.existsSync(artifactImg) && !fs.existsSync(targetImg)) {
    fs.copyFileSync(artifactImg, targetImg)
    console.log('[CampusSetup] Copied campus background image to public/campus.jpg')
  }
} catch (e) {
  // Graceful fallback if path permissions differ
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true,
  },
})
