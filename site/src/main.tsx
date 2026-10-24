import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import LangProvider from '@/components/lang-provider'
import { ACCENT_PRESETS, THEME } from '@/data/site'

// Apply the accent colour (only small details use it).
// In development, ?accent=blue|yellow|none previews a preset without editing the code.
function applyTheme() {
  let theme: { accent: string | null; accentInk: string; label?: string } = THEME
  if (import.meta.env.DEV) {
    const preset = new URLSearchParams(window.location.search).get('accent')
    if (preset && preset in ACCENT_PRESETS) theme = ACCENT_PRESETS[preset as keyof typeof ACCENT_PRESETS]
  }
  if (!theme.accent) return
  const root = document.documentElement.style
  root.setProperty('--color-accent', theme.accent)
  root.setProperty('--color-accent-ink', theme.accentInk)
  if (theme.label) root.setProperty('--color-label', theme.label)
}
applyTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
