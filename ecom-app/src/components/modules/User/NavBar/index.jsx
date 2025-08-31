import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/android-chrome-512x512.png";
import styled from "@emotion/styled";
import i18next, { t } from "i18next";
import { useLocationData } from "@hooks";
import { useGlobalContext } from "@store";
import LoginComponent from "../LoginComponent";

const STORAGE_KEY = "lang";
const LOCATION_KEY = "location";
const storage = window?.localStorage;

const Container = styled.div`
  padding: 0 10px;
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

const LanguageSelector = styled.select`
  height: 32px;
  width: 90px;
  border: none;
  padding: 2px 5px;
  border-radius: 6px;
  outline: none;
`;

const IconWrapper = styled.div`
  border-right: 2px inset #e3e3e3;
  width: 50px;
  padding: 6px;
`;

const LocationSelectorWrapper = styled.div`
  padding: 6px 10px;
`;
const LocationDropdown = styled.select`
  height: 32px;
  width: 250px;
  border: none;
  padding: 2px 5px;
  border-radius: 6px;
  outline: none;
`;

// const LoginButton = styled.button`
//   background-color: #fff;
//   border-radius: 6px;
//   width: 100px;
//   height: 32px;
//   border: none;
//   margin-right: 20px;
//   font-size: 16px;
//   cursor: pointer;
//   box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
//     0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
//   &:hover {
//     box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
//       0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
//   }
// `;

function NavBar() {
  const language = storage.getItem(STORAGE_KEY) || "en";
  const [lang, setLang] = useState(() => language);

  useEffect(() => {
    i18next.changeLanguage(language).then(() => {});
    setLang(language);
  }, [language]);

  useLocationData({
    enabled: true,
  });

  const { state: { locations = [] } = {} } = useGlobalContext();

  const locs =
    storage.getItem(LOCATION_KEY) ||
    (locations?.length > 0 && locations[0]?.id);

  useEffect(() => {
    setLocationId(locs);
  }, [locs]);

  const [locationId, setLocationId] = useState(() => locs);

  return (
    <Container>
      <LeftContainer>
        <IconWrapper>
          <Icon src={Logo} />
        </IconWrapper>
        <LocationSelectorWrapper>
          <LocationDropdown
            value={locationId}
            onChange={(e) => {
              storage.setItem(LOCATION_KEY, e.target.value);
              setLocationId(e.target.value);
            }}
          >
            {locations.map((location) => {
              const { id, city, country, name, state } = location;
              return (
                <option
                  key={id}
                  value={id}
                >{`${name}, ${city}, ${state}, ${country} `}</option>
              );
            })}
          </LocationDropdown>
        </LocationSelectorWrapper>
      </LeftContainer>
      <RightContainer>
        <LoginComponent />
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
