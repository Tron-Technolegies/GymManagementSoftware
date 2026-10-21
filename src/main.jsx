import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import originalLogo from "./assets/originallogo.png"

// Set browser tab icon
const favicon = document.querySelector("link[rel='icon']")
if (favicon) {
  favicon.href = originalLogo
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)