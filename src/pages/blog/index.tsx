import { useEffect, useState } from "react"
import { PostCard } from "@/components/PostCard"
import { Loading } from "@/components/Loading"
import { usePostStore } from "@/store/posts"
import { CreatePostCard } from "@/components/CreatePostCard"

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
  const [isLoading, setIsLoading] = useState(true)
  const fetchPosts = usePostStore(state => state.fetchPosts)
  const posts = usePostStore(state => state.posts)

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
              <CreatePostCard />

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