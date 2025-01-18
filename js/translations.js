const langs = ["en", "sk"];
const flags = ["🇬🇧", "🇸🇰"];
const defaultLangIndex = 1;
const button = document.getElementById('language-dropdown');
let langIndex = getSavedLanguageIndex();

async function translate () {
    if (langIndex === null) {
        saveLanguageIndex(defaultLangIndex);
        langIndex = defaultLangIndex;
    }
    button.textContent = flags[(langIndex + 1) % langs.length];
    button.onclick = function () {
        cycleLanguages();
        button.textContent = flags[(langIndex + 1) % langs.length];
        applyTranslations(langs[langIndex]);
    };
    applyTranslations(langs[langIndex]);
};

function cycleLanguages() {
    langIndex = (langIndex + 1) % langs.length;
    saveLanguageIndex(langIndex);
}

function saveLanguageIndex(index) {
    localStorage.setItem('langIndex', index);
}

function getSavedLanguageIndex() {
    return localStorage.getItem('langIndex') !== null ? parseInt(localStorage.getItem('langIndex')) : null;
}

async function loadTranslations(language) {
    const translationsFile = `../translations/${language}.json`;

    try {
        const response = await fetch(translationsFile);
        return await response.json();
    } catch (error) {
        console.error(`Error loading translations for ${language}:`, error);
        return {};
    }
}

async function applyTranslations(language) {
    const translations = await loadTranslations(language);
    const elements = document.querySelectorAll('.translatable');

    elements.forEach((element) => {
        const key = element.getAttribute('data-key');
        if (translations[key]) {
            element.innerHTML = translations[key].replace(/\n/g, '<br>');
        }
    });
}