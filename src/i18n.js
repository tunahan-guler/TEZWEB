import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en} from './localization/en.js'
import {tr} from './localization/tr.js'
// const en = require('./localization/en.json');
// const tr = require('./localization/tr.json');

// the translations
// (tip move them in a JSON file and import them)
const resources = { 
  en: en.en,
  tr: tr.tr
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'tr',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
