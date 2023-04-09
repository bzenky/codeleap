import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { PostCard } from "@/components/PostCard"
import { Loading } from "@/components/Loading"
import { CreatePostCard } from "@/components/CreatePostCard"
import { Toast } from "@/components/Toast"
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

interface PaginationProps {
  selected: number
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true)
  const [pageOffset, setPageOffset] = useState(0)
  const fetchPosts = usePostStore(state => state.fetchPosts)
  const posts = usePostStore(state => state.posts)
  const username = usePostStore(state => state.username)
  const router = useRouter()
  const totalPosts = posts?.count || 0
  const pages = Math.ceil(totalPosts / 10)

  async function handlePagination(event: PaginationProps) {
    setPageOffset(event.selected)
    const offset = event.selected * 10
    const linkQuery = event.selected === 0
      ? ''
      : `?limit=10&offset=${offset}`

    setIsLoading(true)

    try {
      await api.get<BlogProps>(`${linkQuery}`)
        .then(response => response.data)
        .then(data => usePostStore.setState({ posts: data }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!username) {
      router.push('/')
    } else {
      setIsLoading(true)

      fetchPosts()
        .then(() => setIsLoading(false))
    }
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

              <Toast />

              {posts?.results.map(post => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                )
              })}

              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePagination}
                pageRangeDisplayed={3}
                pageCount={pages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={pageOffset}
                activeLinkClassName="rounded-md px-2 py-1 border border-[#a9a9a9] rounded-full"
                className="flex justify-center gap-2 bg-[#7695EC] py-4 px-1 text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                disabledLinkClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </>
        )
      }
    </main>
  )
}