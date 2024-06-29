'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { useTheme } from 'next-themes'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const isDarkMode = theme === 'dark'

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <IconButton aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'} variant="soft" onClick={toggleTheme}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}

export { ThemeSwitcher }
