import { api } from '@/lib/axios'
import { SpinnerGap } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface RemoveProps {
  postId: string
}

export function Remove({ postId }: RemoveProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function removePost() {
    setIsLoading(true)
    try {
      await api.delete(`/${postId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header>
        <Dialog.Title className="text-[22px] font-bold">
          Are you sure you want to delete this item?
        </Dialog.Title>
      </header>

      <footer className="mt-[25px] flex gap-4 justify-end">
        <Dialog.Close asChild>
          <button className="bg-white max-w-[120px] w-full  h-[32px] items-center justify-center rounded-lg px-3 font-bold  focus:outline-none border border-[#999999]">
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