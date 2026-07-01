import { useLanguageStore } from '../store/languageStore'
import { t } from '../utils/i18n'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { language } = useLanguageStore()

  return (
    <div className="error-message">
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--secondary" onClick={onRetry}>
          {t('retry', language)}
        </button>
      )}
    </div>
  )
}
