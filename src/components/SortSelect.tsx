import { useLanguageStore } from '../store/languageStore'
import { t, translations } from '../utils/i18n'
import type { ChangeEvent } from 'react'
import type { SortField, SortOrder } from '../types/product'

type TranslationKey = keyof typeof translations.ru

interface SortSelectProps {
  sortBy: SortField
  sortOrder: SortOrder
  onChange: (sortBy: SortField, sortOrder: SortOrder) => void
}

const SORT_KEYS: { key: TranslationKey; sortBy: SortField; sortOrder: SortOrder }[] = [
  { key: 'title_asc', sortBy: 'title', sortOrder: 'asc' },
  { key: 'title_desc', sortBy: 'title', sortOrder: 'desc' },
  { key: 'price_asc', sortBy: 'price', sortOrder: 'asc' },
  { key: 'price_desc', sortBy: 'price', sortOrder: 'desc' },
  { key: 'stock_asc', sortBy: 'stock', sortOrder: 'asc' },
  { key: 'stock_desc', sortBy: 'stock', sortOrder: 'desc' },
]

export function SortSelect({ sortBy, sortOrder, onChange }: SortSelectProps) {
  const { language } = useLanguageStore()
  const currentValue = `${sortBy}-${sortOrder}`

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = SORT_KEYS.find((o) => `${o.sortBy}-${o.sortOrder}` === e.target.value)
    if (option) {
      onChange(option.sortBy, option.sortOrder)
    }
  }

  return (
    <div className="sort-select">
      <label htmlFor="sort" className="sort-select__label">
        {t('sortBy', language)}
      </label>
      <select
        id="sort"
        className="sort-select__input"
        value={currentValue}
        onChange={handleChange}
      >
        {SORT_KEYS.map((option) => (
          <option key={`${option.sortBy}-${option.sortOrder}`} value={`${option.sortBy}-${option.sortOrder}`}>
            {t(option.key, language)}
          </option>
        ))}
      </select>
    </div>
  )
}
