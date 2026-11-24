import { useState, useEffect } from 'react';
import { type Language } from './translations';

export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ciptagelar_lang');
    if (saved === 'id' || saved === 'en') return saved;
  }
  return 'en';
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ciptagelar_lang', lang);
    window.dispatchEvent(new CustomEvent('ciptagelar-lang-change', { detail: lang }));
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-lang-en]').forEach((el) => {
      const target = el as HTMLElement;
      if (lang === 'id') {
        const idText = target.getAttribute('data-lang-id');
        if (idText) target.textContent = idText;
      } else {
        const enText = target.getAttribute('data-lang-en');
        if (enText) target.textContent = enText;
      }
    });

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const b = btn as HTMLElement;
      if (b.getAttribute('data-lang-btn') === lang) {
        b.classList.add('text-[#C89B3C]', 'font-semibold');
        b.classList.remove('text-[#F7F5EE]/40', 'text-[#F7F5EE]/70');
      } else {
        b.classList.remove('text-[#C89B3C]', 'font-semibold');
        b.classList.add('text-[#F7F5EE]/70');
      }
    });
  }
}

export function useLanguage(): Language {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getInitialLanguage());
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      setLang(customEvent.detail);
    };
    window.addEventListener('ciptagelar-lang-change', handler);
    return () => window.removeEventListener('ciptagelar-lang-change', handler);
  }, []);

  return lang;
}
