import {createContext, useContext, useState} from "react"
const ThemeContext = createContext()

export function ThemeProvider({children}) {

  const languages = ["en", "th", "ru"]

  const defaultSettings = {
    theme: "light",
    language: "en"
  }

  const [theme, setTheme] = useState(defaultSettings.theme)
  const [language, setLanguage] = useState(defaultSettings.language)

  const resetSettings = () => {
    setTheme(defaultSettings.theme)
    setLanguage(defaultSettings.language)
  }

  return (
    <ThemeContext.Provider value={{
      languages, defaultSettings,
      theme, setTheme,
      language, setLanguage,
      resetSettings
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}