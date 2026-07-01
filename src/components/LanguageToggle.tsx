import { useLanguageStore } from '../store/languageStore'
import './LanguageToggle.css'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <button
      className="language-toggle"
      onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
      title={language === 'ru' ? 'English' : 'Русский'}
      aria-label="Toggle language"
    >
      {language === 'ru' ? 'EN' : 'RU'}
    </button>
  )
}
