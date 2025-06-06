'use client';

import { useEffect } from 'react';

export function GoogleTranslateInitializer() {
  useEffect(() => {
    const addScript = () => {
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        // Potentially re-initialize if needed, or assume it's handled by the script itself
        if (typeof (window as any).googleTranslateElementInit === 'function') {
            (window as any).googleTranslateElementInit();
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    (window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate && (window as any).google.translate.TranslateElement) {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
          'google_translate_element'
        );
      }
    };

    addScript();

    return () => {
      // Clean up script if component unmounts, though often not necessary for GTranslate
      // const script = document.getElementById('google-translate-script');
      // if (script) document.body.removeChild(script);
      // delete (window as any).googleTranslateElementInit;
    };
  }, []);

  return null; // This component doesn't render anything itself
}
