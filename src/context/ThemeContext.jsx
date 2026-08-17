import {createContext, useContext, useState} from "react"
const ThemeContext = createContext()

export function ThemeProvider({children}) {
  const languages = {
    english: {
      name: "en",
      header: "Welcome",
      preview: "This is your preference preview.",
      currentLanguage: "English",
      themeLight: "Light",
      themeDark: "Dark",
    },
    thai: {
      name: "th",
      header: "ยินดีต้อนรับ",
      preview: "นี่คือหน้าตัวอย่างการตั้งค่า",
      currentLanguage: "ไทย",
      themeLight: "แสง",
      themeDark: "มืด",
    },
    russian: {
      name: "ru",
      header: "Добро Пожаловать",
      preview: "Это превью ваших предпочтений",
      currentLanguage: "Русский",
      themeLight: "Светлый",
      themeDark: "Темный",
    }
  }

  const defaultSettings = {
    theme: "light",
    language: languages.english
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