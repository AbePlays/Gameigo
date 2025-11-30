'use client'

import { Link2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

function Share() {
  const [_, copy] = useCopyToClipboard()

  async function copyToClipboard() {
    const res = await copy(window.location.href)
    if (res) {
      toast.success('Link copied to your clipboard.')
    } else {
      toast.error('Failed to copy link.')
    }
  }

  return (
    <IconButton aria-label="Share" onClick={copyToClipboard} title="Share" variant="surface">
      <Link2Icon />
    </IconButton>
  )
}

export { Share }
