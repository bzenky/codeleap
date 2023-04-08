import { PostProps } from "@/pages/blog"
import { distanceToNow } from "@/utils/distanceToNow"

interface PostCardProps {
  post: PostProps
}

export function PostCard({ post }: PostCardProps) {
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
}