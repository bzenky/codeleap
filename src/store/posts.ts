import { api } from "@/lib/axios"
import { create } from "zustand"

export interface PostProps {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export interface BlogProps {
  count: number
  next: string | null
  previous: string | null
  results: PostProps[]
}

interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
  description: string
}

export interface PostState {
  fetchPosts: () => Promise<void>
  openToast: boolean
  posts: BlogProps | null
  username: string
  toastData: ToastProps
  toast: ({ type, description }: ToastProps) => void
}

export const usePostStore =
  create<PostState>((set, get) => ({
    fetchPosts: async () => {
      try {
        await api.get<BlogProps>('')
          .then(response => response.data)
          .then(data => set({ posts: data }))
      } catch (error) {
        console.log(error)
      }
    },
    openToast: false,
    toast: ({ type, description }) => {
      set({
        openToast: true,
        toastData: {
          type,
          description,
        },
      })
    },
    toastData: {
      type: 'default',
      description: '',
    },
    posts: null,
    username: '',
  }))