import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./en.json";
import * as hi from "./hi.json";

const STORAGE_KEY = "lang";
const storage = window?.localStorage;

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === "development",
    fallbackLng: storage.getItem(STORAGE_KEY) || "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          ...en,
        },
      },
      hi: {
        translation: { ...hi },
      },
    },
  });

export default i18n;
