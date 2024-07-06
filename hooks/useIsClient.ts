import React from 'react'

export function useIsClient() {
  const [isClient, setClient] = React.useState(false)

  React.useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
