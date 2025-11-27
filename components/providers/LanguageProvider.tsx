'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { Language, languages, translations } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  languageVersion: number
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [languageVersion, setLanguageVersion] = useState(0)

  useEffect(() => {
    // Load saved preference first
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language') as Language
      if (savedLang && languages.find(l => l.code === savedLang)) {
        setLanguageState(savedLang)
        return
      }
      
      // Detect location-based language if no saved preference
      const detectedLang = detectLanguageFromLocation()
      setLanguageState(detectedLang)
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    setLanguageVersion(prev => prev + 1) // Force re-render
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }, [])

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    languageVersion,
  }), [language, setLanguage, t, languageVersion])

  // Always provide the context, even before mounting
  // This prevents the "must be used within LanguageProvider" error
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

function detectLanguageFromLocation(): Language {
  // Simplified detection - in production, use geolocation API or IP-based detection
  if (typeof window !== 'undefined') {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // Map timezones to languages (simplified)
    if (timezone.includes('Kolkata') || timezone.includes('Delhi')) return 'hi'
    if (timezone.includes('Chennai')) return 'ta'
    if (timezone.includes('Hyderabad')) return 'te'
    if (timezone.includes('Bangalore')) return 'kn'
  }
  return 'en'
}

