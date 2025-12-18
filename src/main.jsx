import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/router.jsx'
import AuthProvider from './Context/AuthProvider.jsx'

// 🔥 React Query imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* 🔹 Wrap with QueryClientProvider */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
