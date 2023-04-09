import { PostProps } from "@/pages/blog"
import { usePostStore } from "@/store/posts"
import { distanceToNow } from "@/utils/distanceToNow"
import { PencilLine, Trash } from "@phosphor-icons/react"
import { Modal } from "./Modal"

interface PostCardProps {
  post: PostProps
}

export function PostCard({ post }: PostCardProps) {
  const created_at = new Date(post.created_datetime)
  const username = usePostStore(state => state.username)

  return (
    <div>
      <header className="flex items-center justify-between w-full h-[50px] md:h-[70px] px-4 md:px-9 bg-[#7695EC] rounded-t-2xl">
        <h2 className="text-lg md:text-[22px] truncate font-bold text-white">
          {post.title}
        </h2>

        {username === post.username && (
          <div className="flex gap-6">
            <Modal type="remove" postId={String(post.id)}>
              <Trash
                size={20}
                color="#ffffff"
                weight="bold"
                className="cursor-pointer"
              />
            </Modal>

            <Modal type="edit" postId={String(post.id)}>
              <PencilLine
                size={20}
                color="#ffffff"
                weight="bold"
                className="cursor-pointer"
              />
            </Modal>
          </div>
        )}
      </header>

      <div className="flex flex-col p-4 md:p-6 border border-[#999999] rounded-b-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base md:text-lg truncate max-w-[10ch] md:max-w-[20ch] font-bold text-[#777777]" title={post.username}>
            @{post.username}
          </span>

          <span className="text-sm md:text-base whitespace-nowrap">
            {distanceToNow(created_at)}
          </span>
        </div>

        <p className="text-base md:text-lg break-words">
          {post.content}
        </p>
      </div>
    </div>
  )
}