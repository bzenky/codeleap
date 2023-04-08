import { create } from "zustand"

export interface PostState {
  username: string
}

export const usePostStore =
  create<PostState>((set, get) => ({
    username: ''
  }))