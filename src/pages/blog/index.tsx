import { useState } from "react"
import { api } from "@/lib/axios"
import { distanceToNow } from "@/utils/distanceToNow"
import { GetServerSideProps, GetStaticProps } from "next/types"

interface PostsProps {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

interface BlogProps {
  posts: {
    count: number
    next: string | null
    previous: string | null
    results: PostsProps[]
  }
}

export default function Blog({ posts }: BlogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#DDDDDD]">
      <header className="flex items-center max-w-[800px] w-[94%] h-20 px-9 bg-[#7695EC]">
        <h1 className="text-[22px] font-bold text-white">
          CodeLeap Network
        </h1>
      </header>

      <div className="flex flex-col gap-6 max-w-[800px] w-[94%] min-h-screen p-6 bg-white">
        <form className="flex flex-col border border-[#999999] p-6 rounded-2xl">
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
            className="w-[111px] h-[32px] bg-[#7695EC] text-white font-bold rounded-lg ml-auto hover:bg-[#5d7eda] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            disabled={title.trim().length === 0 || content.trim().length === 0}
          >
            Create
          </button>
        </form>

        {posts.results.map(post => {
          const created_at = new Date(post.created_datetime)

          return (
            <div key={post.id}>
              <header className="flex items-center w-full  h-[70px] px-9 bg-[#7695EC] rounded-t-2xl">
                <h2 className="text-[22px] font-bold text-white">
                  {post.title}
                </h2>
              </header>

              <div className="flex flex-col p-6 border border-[#999999] rounded-b-2xl">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold text-[#777777]">
                    @{post.username}
                  </span>

                  <span>
                    {distanceToNow(created_at)}
                  </span>
                </div>

                <p className="text-lg">
                  {post.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await api.get<BlogProps>('')
    .then(response => response.data)

  return {
    props: {
      posts
    },
  }
}