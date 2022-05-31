import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import basesFR from '../public/locales/fr/bases.json';
import chatFR from '../public/locales/fr/chat.json';
import communicationsFR from '../public/locales/fr/communications';
import facilitiesFR from '../public/locales/fr/facilities.json';
import mapFR from '../public/locales/fr/map.json';
import politicsFR from '../public/locales/fr/politics.json';
import presentationFR from '../public/locales/fr/presentation.json';
import shipsFR from '../public/locales/fr/ships.json';
import specialtiesFR from '../public/locales/fr/specialties.json';
import technologiesFR from '../public/locales/fr/technologies.json';

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    bases: basesFR,
    communications: communicationsFR,
    chat: chatFR,
    facilities: facilitiesFR,
    map: mapFR,
    politics: politicsFR,
    presentation: presentationFR,
    ships: shipsFR,
    specialties: specialtiesFR,
    technologies: technologiesFR,
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
