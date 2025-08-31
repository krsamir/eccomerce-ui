import { Button } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import Logo from "@assets/android-chrome-512x512.png";
import CONSTANTS from "@ecom/ui/constants";
import { useNavigate } from "react-router";
import { getRole } from "@utils";
import { useGlobalContext } from "@store";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${({ theme: { p1 } }) => p1};
  height: 60px;
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
  cursor: pointer;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
`;

const storage = window?.localStorage;
const Text = styled.span`
  text-decoration: underline;
  margin-left: 5px;
`;
function NavBar() {
  const handleLogout = () => {
    storage?.clear();
    setTimeout(() => {
      window?.location?.reload();
    }, 500);
  };
  const navigate = useNavigate();
  const { state: { user } = {} } = useGlobalContext();
  return (
    <>
      <Container>
        <LeftContainer>
          <ImageContainer src={Logo} />
        </LeftContainer>
        <RightContainer>
          {user && (
            <Button variant="contained">
              Hi <Text>{user?.name}</Text>
            </Button>
          )}
          {getRole()?.length > 0 && (
            <Button
              variant="contained"
              onClick={() => navigate(CONSTANTS.ROUTE_PATHS[getRole()].MAIN)}
            >
              {(getRole() ?? "")?.replace("_", " ")}
            </Button>
          )}
          <Button variant="contained" onClick={() => handleLogout()}>
            Logout
          </Button>
        </RightContainer>
      </Container>
    </>
  );
}

export default NavBar;
