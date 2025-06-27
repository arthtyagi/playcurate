"use client"

import { Provider } from "jotai"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <Toaster />
    </Provider>
  )
} 