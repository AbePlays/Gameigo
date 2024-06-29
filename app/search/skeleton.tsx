import LoadingCard from '@components/LoadingCard'

function Loading() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
      <LoadingCard count={6} />
    </div>
  )
}

export { Loading }
