'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Input() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    const query = new FormData(e.currentTarget).get('query') as string
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <TextField.Root
        className="!bg-[--color-background] !h-12"
        defaultValue={searchParams.get('query')?.toString()}
        name="query"
        placeholder="Search Games"
        size="3"
        type="search"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon color="gray" height={20} width={20} />
        </TextField.Slot>
      </TextField.Root>
    </form>
  )
}

export { Input }
