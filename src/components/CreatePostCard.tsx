import { useState } from "react"
import { SpinnerGap } from "@phosphor-icons/react"
import { PostProps, usePostStore } from "@/store/posts"
import { api } from "@/lib/axios"

export function CreatePostCard() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const fetchPosts = usePostStore(state => state.fetchPosts)
  const username = usePostStore(state => state.username)
  const toast = usePostStore(state => state.toast)

  async function handleCreatePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsFetching(true)

      await api.post<PostProps>('', {
        username,
        title,
        content
      })
        .then(() => {
          setTitle('')
          setContent('')
          fetchPosts()
        })

      toast({
        description: 'Post created successfully',
        type: 'success'
      })
      fetchPosts()
    } catch (error) {
      toast({
        description: 'Ops, something went wrong.',
        type: 'error'
      })
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <form
      className="flex flex-col border border-[#999999] p-6 rounded-2xl"
      onSubmit={(event) => handleCreatePost(event)}
    >
      <h2 className="mb-6 font-bold text-[22px]">
        What's on your mind ?
      </h2>

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

      <button
        className="flex justify-center items-center w-[111px] h-[32px] bg-[#7695EC] text-white font-bold rounded-lg ml-auto hover:bg-[#5d7eda] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        disabled={title.trim().length === 0 || content.trim().length === 0}
      >
        {isFetching
          ? <SpinnerGap size={24} className="animate-spin" color="#ffffff" />
          : 'Create'
        }
      </button>
    </form>
  )
}