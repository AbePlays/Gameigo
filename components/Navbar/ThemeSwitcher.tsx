'use client'

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Box, IconButton } from '@radix-ui/themes'
import { useTheme } from 'next-themes'

import { useIsClient } from '@hooks/useIsClient'

function ThemeSwitcher() {
  const isClient = useIsClient()
  const { theme, setTheme } = useTheme()

  if (!isClient) {
    return <Box height="2rem" width="2rem" />
  }

  const isDarkMode = theme === 'dark'
  const isLightMode = theme === 'light'
  const isSystem = theme === 'system'

  let ariaLabel = ''

  if (isLightMode) {
    ariaLabel = 'Switch to dark mode'
  } else if (isDarkMode) {
    ariaLabel = 'Switch to system mode'
  } else {
    ariaLabel = 'Switch to light mode'
  }

  function toggleTheme() {
    if (isLightMode) {
      setTheme('dark')
    } else if (isDarkMode) {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <IconButton aria-label={ariaLabel} variant="soft" onClick={toggleTheme} title={ariaLabel}>
      {isDarkMode ? <MoonIcon /> : null}
      {isLightMode ? <SunIcon /> : null}
      {isSystem ? <DesktopIcon /> : null}
    </IconButton>
  )
}

export { ThemeSwitcher }
