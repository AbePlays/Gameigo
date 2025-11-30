'use client'

import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons'
import { IconButton, Spinner } from '@radix-ui/themes'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'react-hot-toast'

import type { GameDetail } from '@/schemas/game'
import { toggleFavorite } from './actions'

export type FavoriteProps = {
  isFavorite: boolean
  gameDetails: GameDetail
  userId: string
}

function Submit({ isFavorite }: { isFavorite: boolean }) {
  const { pending } = useFormStatus()

  return (
    <IconButton aria-label="Favorite" title="Favorite" type="submit" variant="surface">
      {pending ? <Spinner /> : isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
    </IconButton>
  )
}

export default function Favorite(props: FavoriteProps) {
  const { isFavorite, gameDetails, userId } = props
  const [state, formAction] = useActionState(toggleFavorite, {
    message: '',
    ok: true,
  })

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message)
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} readOnly={true} />
      <input type="hidden" name="gameId" value={gameDetails.id} readOnly={true} />
      <input type="hidden" name="slug" value={gameDetails.slug} readOnly={true} />
      <Submit isFavorite={isFavorite} />
    </form>
  )
}
