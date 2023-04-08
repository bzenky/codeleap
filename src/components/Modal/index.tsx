import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Remove } from './Remove'
import { Edit } from './Edit'

interface ModalProps {
  children: ReactNode
  type: 'edit' | 'remove'
  postId: string
}

export function Modal({
  children,
  type,
  postId
}: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/25 data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[660px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {type === 'remove'
            ? <Remove postId={postId} />
            : <Edit postId={postId} />
          }
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 