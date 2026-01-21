document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC YEAR
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. TRANSLATIONS
    const translations = {
        en: {
            'page_title': 'QR Code Tools',
            'page_subtitle': 'Essential Utilities for MikroTik Hotspot',
            'card_scanner_title': 'QR Scanner',
            'card_scanner_desc': 'Secure QR Code Scanner for Hotspot Login. Supports manual camera control and file upload.',
            'card_generator_title': 'QR Generator',
            'card_generator_desc': 'Create QR Code Vouchers for Hotspot users instantly in bulk or single mode.',
            'footer_text': 'QR Code Tools'
        },
        id: {
            'page_title': 'Alat Kode QR',
            'page_subtitle': 'Utilitas Penting untuk Hotspot MikroTik',
            'card_scanner_title': 'Pemindai QR',
            'card_scanner_desc': 'Pemindai QR Code aman untuk Login Hotspot. Mendukung kontrol kamera manual dan unggah file.',
            'card_generator_title': 'Pembuat QR',
            'card_generator_desc': 'Buat Voucher QR Code untuk pengguna Hotspot secara instan (massal/satuan).',
            'footer_text': 'Alat Kode QR'
        }
    };

    // 3. LANGUAGE TOGGLE LOGIC
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    
    // Get stored language or default to 'en'
    let currentLang = localStorage.getItem('qr_tool_lang') || 'en';

    const applyLanguage = (lang) => {
        const t = translations[lang];
        
        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });

        // Update Button Text (Show what you will switch TO, or current? usually current)
        // Reference uses icons. I'll use text EN / ID for simplicity or icons if HTML expects them.
        // Let's assume text for now based on "toggle translate layaknya di..." which had icons.
        // I will implement "active state" styling if I see icons. 
        
        // Simplest: Button shows "ID" if current is EN (switch to ID), and vice versa? 
        // Or show both "EN | ID" and highlight active.
        // Reference uses generic toggle button. Let's start with just updating content.
        
        if (langText) langText.textContent = lang.toUpperCase();
        
        document.documentElement.lang = lang;
        localStorage.setItem('qr_tool_lang', lang);
    };

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            applyLanguage(currentLang);
        });
    }

    // Initialize
    applyLanguage(currentLang);
});
