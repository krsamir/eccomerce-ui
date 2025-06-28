import styled from "@emotion/styled";
import React from "react";
import NavBar from "./Navbar";
import CONSTANTS from "@ecom/ui/constants";
import { useNavigate } from "react-router";
import { Card } from "@mui/material";

const FullWidthContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;
const LeftContainer = styled.div`
  flex: 3;
  border-radius: 6px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;
const RightContainer = styled.div`
  flex: 7;
`;

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <FullWidthContainer>
        <LeftContainer>
          {(CONSTANTS.APP_CONSTANTS[CONSTANTS.ROLE_NAME]?.SIDEBAR ?? [])?.map(
            ({ id, name, route }) => (
              <Card key={id} onClick={() => navigate(route)}>
                {name}
              </Card>
            )
          )}
        </LeftContainer>
        <RightContainer>75%</RightContainer>
      </FullWidthContainer>
    </>
  );
}

export default Home;
