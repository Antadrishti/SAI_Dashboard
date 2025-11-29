'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { Language, languages, translations } from '@/lib/i18n'

// Mapping of language codes to locale codes for Intl
const localeMap: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  or: 'or-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  as: 'as-IN',
}

// Number digit mappings for each language
const digitMaps: Record<Language, string[]> = {
  en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  hi: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  ta: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  te: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  kn: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  mr: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  gu: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  or: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
  ml: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
  pa: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  as: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  formatNumber: (num: number) => string
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string
  formatPercent: (num: number) => string
  getLocale: () => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load saved preference
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language') as Language
      if (savedLang && languages.find(l => l.code === savedLang)) {
        setLanguageState(savedLang)
        return
      }
      
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language
      if (languages.find(l => l.code === browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }, [])

  // Get locale for current language
  const getLocale = useCallback((): string => {
    return localeMap[language] || 'en-IN'
  }, [language])

  // Convert digits to local script
  const convertToLocalDigits = useCallback((str: string): string => {
    if (language === 'en') return str
    const digits = digitMaps[language]
    return str.replace(/[0-9]/g, (digit) => digits[parseInt(digit)])
  }, [language])

  // Format number with local digits
  const formatNumber = useCallback((num: number): string => {
    // Use Intl.NumberFormat for proper formatting (comma separators etc.)
    const formatted = new Intl.NumberFormat(getLocale()).format(num)
    // Convert digits to local script
    return convertToLocalDigits(formatted)
  }, [getLocale, convertToLocalDigits])

  // Format date in local language
  const formatDate = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    }
    const formatted = new Intl.DateTimeFormat(getLocale(), defaultOptions).format(dateObj)
    return convertToLocalDigits(formatted)
  }, [getLocale, convertToLocalDigits])

  // Format percentage
  const formatPercent = useCallback((num: number): string => {
    const formatted = new Intl.NumberFormat(getLocale(), {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num / 100)
    return convertToLocalDigits(formatted)
  }, [getLocale, convertToLocalDigits])

  // Simple translation function - uses the hardcoded translations
  const t = useCallback((key: string): string => {
    // Get translation from the translations object
    const translation = translations[language]?.[key]
    
    // If translation exists, return it
    if (translation) {
      return translation
    }
    
    // Fallback to English translation
    const englishTranslation = translations.en[key]
    if (englishTranslation) {
      return englishTranslation
    }
    
    // If no translation found, return the key itself
    return key
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    formatNumber,
    formatDate,
    formatPercent,
    getLocale,
  }), [language, setLanguage, t, formatNumber, formatDate, formatPercent, getLocale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
