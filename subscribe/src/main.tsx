import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/Auth.tsx'
import { Toaster } from "@/components/ui/sonner"
import { store } from '@/app/store.ts'
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Provider store={store}>
      <AuthProvider>
        <App />
        <Toaster position='top-right' />
      </AuthProvider>
    </Provider>
  </ThemeProvider>
)
