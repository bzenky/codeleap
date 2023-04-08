import { api } from '@/lib/axios'
import { SpinnerGap } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface EditProps {
  postId: string
}

export function Edit({ postId }: EditProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function updatePost() {
    setIsLoading(true)
    try {
      // await api
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header>
        <Dialog.Title className="text-[22px] font-bold mb-6">
          Edit item
        </Dialog.Title>
      </header>

      <div>
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          className='w-full h-8 text-sm px-3 border border-[#777777] rounded-lg mt-2 mb-4'
          placeholder="Hello world"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="">
          Content
        </label>

        <textarea
          id="content"
          placeholder="Content here"
          className='w-full h-[74px] text-sm py-2 px-3 border border-[#777777] rounded-lg mt-2 mb-4 resize-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <footer className="mt-[25px] flex gap-4 justify-end">
        <Dialog.Close asChild>
          <button className="bg-white max-w-[120px] w-full  h-[32px] items-center justify-center rounded-lg px-3 font-bold  focus:outline-none border border-[#999999]">
            Cancel
          </button>
        </Dialog.Close>

        <button
          className="flex justify-center items-center bg-[#47B960] text-white  max-w-[120px] w-full h-[32px] items-center justify-center rounded-lg px-3 font-bold focus:outline-none"
        >
          {isLoading
            ? <SpinnerGap size={24} className="animate-spin" color="#ffffff" />
            : 'Save'
          }
        </button>
      </footer>
    </>
  )
}