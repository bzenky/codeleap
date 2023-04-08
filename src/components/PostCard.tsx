import { PostProps } from "@/pages/blog"
import { usePostStore } from "@/store/posts"
import { distanceToNow } from "@/utils/distanceToNow"
import { PencilLine, Trash } from "@phosphor-icons/react"

interface PostCardProps {
  post: PostProps
}

export function PostCard({ post }: PostCardProps) {
  const created_at = new Date(post.created_datetime)
  const username = usePostStore(state => state.username)

  return (
    <div key={post.id}>
      <header className="flex items-center justify-between w-full  h-[70px] px-9 bg-[#7695EC] rounded-t-2xl">
        <h2 className="text-[22px] font-bold text-white">
          {post.title}
        </h2>

        {username === post.username && (
          <div className="flex gap-6">
            <button>
              <Trash size={24} color="#ffffff" />
            </button>

            <button>
              <PencilLine size={24} color="#ffffff" />
            </button>
          </div>
        )}
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
}