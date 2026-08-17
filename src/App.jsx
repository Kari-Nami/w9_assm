import { useTheme } from "./context/ThemeContext.jsx";
import './App.css'
import {useEffect} from "react";

const text = {
  en: {
    name: "English",
    header: "Welcome",
    preview: "This is your preference preview.",
    themeLight: "Light",
    themeDark: "Dark",
  },
  th: {
    name: "ไทย",
    header: "ยินดีต้อนรับ",
    preview: "นี่คือหน้าตัวอย่างการตั้งค่า",
    themeLight: "สว่าง",
    themeDark: "มืด",
  },
  ru: {
    name: "Русский",
    header: "Добро Пожаловать",
    preview: "Это превью ваших предпочтений.",
    themeLight: "Светлый",
    themeDark: "Темный",
  }
}

function App() {
  const { languages, defaultSettings, theme, setTheme, language, setLanguage, resetSettings } = useTheme()
  const LOCAL_STORAGE_NAME = "settings"

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))

    if (savedSettings) {
      console.log("--> local storage loaded")
      console.log(savedSettings)
      setTheme(savedSettings.theme)
      setLanguage(savedSettings.language)
    }
    else {
      console.log("--> empty, resetting local storage")
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
        theme: defaultSettings.theme,
        language: defaultSettings.language
      }))
    }
  }, []);

  function handleThemeChange(newTheme) {
    setTheme(newTheme)

    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
      theme: newTheme,
      language: storage.language
    }))
  }

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)

    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify({
      theme: storage.theme,
      language: newLanguage
    }))
  }

  return (
    <div className={`page-container ${theme === "light" ? "light" : "dark"}`}>
      <div className={`top-panel ${theme === "light" ? "light" : "dark"}`}>
        <h1>{text[language].header}</h1>
        <div className={`settings-panel ${theme === "light" ? "light" : "dark"}`}>
          {theme === "light" ?
            <button onClick={() => handleThemeChange("dark")} >{text[language].themeDark}</button>
            :
            <button onClick={() => handleThemeChange("light")} >{text[language].themeLight}</button>
          }

          <select name="language" id="language" value={language} onChange={(event) => handleLanguageChange(event.target.value)}>
            {languages.map((language) => {
              return (
                <option key={language} value={language}>{text[language].name}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className={`preview-card ${theme === "light" ? "light" : "dark"}`}>
        {text[language].preview}
      </div>
    </div>
  )
}

export default App
