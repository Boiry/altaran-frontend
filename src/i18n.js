import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import basesFR from '../public/locales/fr/bases.json';
import facilitiesFR from '../public/locales/fr/facilities.json';
import technologiesFR from '../public/locales/fr/technologies.json';
import communicationsFR from '../public/locales/fr/communications';
import specialtiesFR from '../public/locales/fr/specialties.json';

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    bases: basesFR,
    facilities: facilitiesFR,
    technologies: technologiesFR,
    communications: communicationsFR,
    specialties: specialtiesFR,
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",

    keySeparator : '.',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
