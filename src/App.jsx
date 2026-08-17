import { useTheme } from "./context/ThemeContext.jsx";
import './App.css'
import {useEffect} from "react";

function App() {
  const { languages, defaultSettings, theme, setTheme, language, setLanguage, resetSettings } = useTheme()
  const LOCAL_STORAGE_NAME = "settings"

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))

    if (savedSettings) {
      console.log("--> local storage loaded")
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
        <h1>{language.header}</h1>
        <div className={`settings-panel ${theme === "light" ? "light" : "dark"}`}>
          <select name="language" id="language" onChange={(event) => setLanguage(event.target.value)} >
            {Object.entries(languages).map((language) => {
              console.log(language[1])
              return (
                <option key={language[1]} value={language[1].name}>{language[1].currentLanguage}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className={`preview-card ${theme === "light" ? "light" : "dark"}`}>
        {language.preview}
      </div>
    </div>
  )
}

export default App
