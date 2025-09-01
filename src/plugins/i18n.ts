import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'

function getBrowserLang(): string {
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('es')) return 'es'
  if (lang.startsWith('en')) return 'en'
  return 'es'
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLang(),
  fallbackLocale: 'es',
  messages: {
    en,
    es
  }
})

export default i18n