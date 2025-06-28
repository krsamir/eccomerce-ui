import { Button } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import Logo from "@assets/android-chrome-512x512.png";
import CONSTANTS from "@ecom/ui/constants";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: aliceblue;
  padding: 10px 5px;
  box-sizing: border-box;
  position: sticky;
  z-index: 999;
`;
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ImageContainer = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const storage = window?.localStorage;
const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);

function NavBar() {
  const handleLogout = () => {
    storage?.clear();
    setTimeout(() => {
      window?.location?.reload();
    }, 500);
  };

  return (
    <>
      <Container>
        <LeftContainer>
          <ImageContainer src={Logo} />
        </LeftContainer>
        <RightContainer>
          <Button variant="contained">
            {(CONSTANTS.ROLE_MAP.get(roleKey) ?? "")?.replace("_", " ")}
          </Button>
          <Button variant="contained" onClick={() => handleLogout()}>
            Logout
          </Button>
        </RightContainer>
      </Container>
    </>
  );
}

export default NavBar;
