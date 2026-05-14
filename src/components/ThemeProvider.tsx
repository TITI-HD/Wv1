import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"
type FontSize = "small" | "medium" | "large"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultFontSize?: FontSize
}

type ThemeProviderState = {
  theme: Theme
  fontSize: FontSize
  setTheme: (theme: Theme) => void
  setFontSize: (size: FontSize) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  fontSize: "medium",
  setTheme: () => null,
  setFontSize: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultFontSize = "medium",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [fontSize, setFontSize] = useState<FontSize>(defaultFontSize)

  useEffect(() => {
    const root = window.document.documentElement

    // Theme handle
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Font size handle
    root.classList.remove("text-sm", "text-base", "text-lg")
    if (fontSize === 'small') root.classList.add("text-sm")
    if (fontSize === 'medium') root.classList.add("text-base")
    if (fontSize === 'large') root.classList.add("text-lg")

  }, [theme, fontSize])

  const value = {
    theme,
    fontSize,
    setTheme,
    setFontSize,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
