'use client'

import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import type { GameScreenshot } from '@/schemas/game'

export type PhotoViewerProps = {
  screenshots: GameScreenshot['results']
}

export function PhotoViewer(props: PhotoViewerProps) {
  const { screenshots } = props

  return (
    <PhotoProvider>
      <Flex asChild gap="4" mt="4">
        <ul className="overflow-scroll">
          {screenshots.map((item) => {
            return (
              <PhotoView key={item.id} src={item.image}>
                <li className="bg-[--gray-10] relative rounded overflow-hidden shrink-0 h-42 aspect-ratio-video object-cover cursor-pointer">
                  <Image alt={`game-screenshot-${item.id}`} fill src={item.image} />
                </li>
              </PhotoView>
            )
          })}
        </ul>
      </Flex>
    </PhotoProvider>
  )
}
