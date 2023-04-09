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

export interface PostState {
  username: string
  fetchPosts: () => Promise<void>
  posts: BlogProps | null
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
    username: '',
    posts: null,
  }))