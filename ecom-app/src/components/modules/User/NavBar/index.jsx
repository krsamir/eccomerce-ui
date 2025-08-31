import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/android-chrome-512x512.png";
import styled from "@emotion/styled";
import i18next, { t } from "i18next";

const STORAGE_KEY = "lang";
const storage = window?.localStorage;

const Container = styled.div`
  padding: 10px;
  background-color: ${({ theme: { p1 } }) => p1};
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// const LocationWrapper = sty

const LanguageSelector = styled.select`
  height: 25px;
  width: 90px;
  border: none;
  padding: 2px 5px;
  border-radius: 6px;
  outline: none;
`;

function NavBar() {
  const language = storage.getItem(STORAGE_KEY) || "en";
  const [lang, setLang] = useState(() => language);

  useEffect(() => {
    i18next.changeLanguage(language).then(() => {
      console.log(`Language Changed to ${language}`);
    });
    setLang(language);
  }, [language]);

  return (
    <Container>
      <LeftContainer>
        <Icon src={Logo} />
        <span>{t("welcome")}</span>
      </LeftContainer>
      <RightContainer>
        <LanguageSelector
          onChange={(e) => {
            i18next.changeLanguage(e.target.value).then(() => {
              console.log(`Language Changed to ${e.target.value}`);
            });
            storage.setItem(STORAGE_KEY, e.target.value);
            setLang(e.target.value);
          }}
          value={lang}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </LanguageSelector>
      </RightContainer>
    </Container>
  );
}

export default NavBar;
