import { useEffect, useState } from "react"
import { SpinnerGap } from "@phosphor-icons/react"
import { PostCard } from "@/components/PostCard"
import { Loading } from "@/components/Loading"
import { usePostStore } from "@/store/posts"
import { api } from "@/lib/axios"

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

export default function Blog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const fetchPosts = usePostStore(state => state.fetchPosts)
  const username = usePostStore(state => state.username)
  const posts = usePostStore(state => state.posts)

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

      fetchPosts()
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    fetchPosts()
      .then(() => setIsLoading(false))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#DDDDDD]">
      {isLoading
        ? <Loading />
        : (
          <>
            <header className="flex items-center max-w-[800px] w-[94%] h-20 px-9 bg-[#7695EC]">
              <h1 className="text-[22px] font-bold text-white">
                CodeLeap Network
              </h1>
            </header>

            <div className="flex flex-col gap-6 max-w-[800px] w-[94%] min-h-screen p-6 bg-white">
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

              {posts?.results.map(post => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                )
              })}
            </div>
          </>
        )
      }
    </main>
  )
}