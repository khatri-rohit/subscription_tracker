import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/Auth.tsx'
import { Toaster } from "@/components/ui/sonner"
import { store } from '@/app/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
      <Toaster position='top-right' />
    </AuthProvider>
  </Provider>
)
