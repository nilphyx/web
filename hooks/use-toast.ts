import { useState, useCallback } from 'react'

type ToastType = "default" | "destructive"

type Toast = {
  id: string
  title: string
  description?: string
  type?: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, type = "default" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, title, description, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  return { toast, toasts }
} 