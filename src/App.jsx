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

  return (
    <div className={theme === "light" ? "light" : "dark"}>
      <div className="top-panel">
        <h1>{text[language].header}</h1>
        <div className={`settings-panel ${theme === "light" ? "light" : "dark"}`}>
          <select name="language" id="language" onChange={(event) => setLanguage(event.target.value)} >
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
