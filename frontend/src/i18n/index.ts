import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import zh from './locales/zh'

export type LangId = 'en' | 'zh'

export const languages: Record<LangId, { name: string; label: string }> = {
  en: { name: 'English', label: 'EN' },
  zh: { name: '中文',    label: '中' },
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n
