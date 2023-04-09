import { api } from '@/lib/axios'
import { usePostStore } from '@/store/posts'
import { SpinnerGap } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface RemoveProps {
  postId: string
  onOpenChange: (value: boolean) => void
}

export function Remove({ postId, onOpenChange }: RemoveProps) {
  const [isLoading, setIsLoading] = useState(false)
  const fetchPosts = usePostStore(state => state.fetchPosts)
  const toast = usePostStore(state => state.toast)

  async function removePost() {
    setIsLoading(true)
    try {
      await api.delete(`/${postId}/`)
      await fetchPosts()

      toast({
        description: 'Post deleted successfully',
        type: 'success'
      })
    } catch (error) {
      toast({
        description: 'Ops, something went wrong.',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <>
      <header>
        <Dialog.Title className="text-lg md:text-[22px] font-bold">
          Are you sure you want to delete this item?
        </Dialog.Title>
      </header>

      <footer className="mt-[25px] flex gap-4 justify-end">
        <Dialog.Close asChild>
          <button className="bg-white max-w-[120px] w-full h-[32px] items-center justify-center rounded-lg px-3 font-bold  focus:outline-none border border-[#999999]">
            Cancel
          </button>
        </Dialog.Close>

        <button
          className="flex justify-center items-center bg-[#FF5151] text-white  max-w-[120px] w-full h-[32px] items-center justify-center rounded-lg px-3 font-bold focus:outline-none"
          onClick={removePost}
        >
          {isLoading
            ? <SpinnerGap size={24} className="animate-spin" color="#ffffff" />
            : 'Delete'
          }
        </button>
      </footer>
    </>
  )
}