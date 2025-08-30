import styled from "@emotion/styled";
import React from "react";
import NavBar from "./Navbar";
import CONSTANTS from "@ecom/ui/constants";
import { Outlet, useNavigate } from "react-router";
import { Card as MCard } from "@mui/material";
import { getRole } from "@utils";
import { useUser } from "@hooks";

const FullWidthContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;
const LeftContainer = styled.div`
  min-width: 200px;
  width: 250px;
  background-color: rgb(247, 247, 247);
  border-radius: 6px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;
const RightContainer = styled.div`
  padding: 20px;
  width: calc(100vw - 250px);
  /* flex: 7; */
`;

const CardWrapper = styled.div`
  padding: 4px 10px;
`;
const Card = styled(MCard)`
  height: 25px;
  padding: 10px;
  font-size: 18px;
  font-weight: 700px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function Home() {
  const navigate = useNavigate();
  useUser({ enabled: true });
  return (
    <>
      <NavBar />
      <FullWidthContainer>
        <LeftContainer>
          {(CONSTANTS.APP_CONSTANTS[getRole()]?.SIDEBAR ?? [])?.map(
            ({ id, name, route }) => (
              <CardWrapper key={id}>
                <Card onClick={() => navigate(route)}>{name}</Card>
              </CardWrapper>
            )
          )}
        </LeftContainer>
        <RightContainer>
          <Outlet />
        </RightContainer>
      </FullWidthContainer>
    </>
  );
}

export default Home;
