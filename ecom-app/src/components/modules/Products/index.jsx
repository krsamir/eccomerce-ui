import CONSTANTS from "@ecom/ui/constants";
import { useProducts } from "@hooks";
import { Button } from "@mui/material";
import { getRole, getStatusColor } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { useGlobalContext } from "@store";
import Pagination from "./components/Pagination";
import SidePanel from "./components/SidePanel";

const map = new Map();

map.set(
  CONSTANTS.ROLES_NAME.SUPER_ADMIN,
  CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN
);
map.set(CONSTANTS.ROLES_NAME.ADMIN, CONSTANTS.ROUTE_PATHS.ADMIN.MAIN);

function Products() {
  const storage = window?.localStorage;
  const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);

  const navigate = useNavigate();

  const [payload, setPayload] = useState({ page: 1 });
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  const { count = 0, getAllProductAsync } = useProducts({
    fetchProducts: true,
  });

  const fetchProducts = async (payloadData) => {
    try {
      const { data: { data: productsData = [] } = {} } = ({} =
        await getAllProductAsync(payloadData));
      setProducts(productsData);
    } catch (error) {
      console.log("🚀 ~ fetchProducts ~ error:", error);
    }
  };

  const {
    state: { units, unitsMap },
  } = useGlobalContext();

  const path = useMemo(
    () =>
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${map.get(getRole(roleKey))}/${
        CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.PRODUCT
      }/create`,
    []
  );

  const handleRedirection = (id) => {
    navigate(
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${map.get(getRole(roleKey))}/${
        CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.PRODUCT
      }/create?id=${id}`
    );
  };

  useEffect(() => {
    fetchProducts(payload);
  }, [payload]);

  const getByFilters = (action = "") => {
    if (action === "clear") {
      setPayload((prev) => ({ ...prev, filters: {} }));
    } else {
      setPayload((prev) => ({ ...prev, filters }));
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => navigate(path)}>
        Create
      </Button>
      <SidePanel
        units={units}
        setFilters={setFilters}
        filters={filters}
        getByFilters={getByFilters}
      />
      <ProductContainer>
        {products.map((item) => (
          <ProductDiv key={item.uuid}>
            <Container>
              <LeftContainer>
                <Container>
                  <Title className="main">{item.name}</Title>
                  {item.hindiName && (
                    <HindiTitle>({item.hindiName})</HindiTitle>
                  )}
                </Container>
                <Container>
                  {item.barcode && (
                    <Toast>
                      <Title>BARCODE:</Title>
                      {item.barcode}
                    </Toast>
                  )}
                  {item.unit && (
                    <Toast>
                      <Title>UNIT: </Title>
                      {item.unit} {unitsMap.get(item.unitType)}
                    </Toast>
                  )}
                  {item.unit && (
                    <Toast>
                      <Title>SYNC STATUS: </Title>
                      <StatusColor $color={getStatusColor(item.status)} />
                      {item.status}
                    </Toast>
                  )}
                </Container>
              </LeftContainer>
              <RightContainer>
                <IconWrapper>
                  <SendIconComponent
                    onClick={() => handleRedirection(item.uuid)}
                  />
                </IconWrapper>
              </RightContainer>
            </Container>
          </ProductDiv>
        ))}
      </ProductContainer>
      <Pagination
        setPayload={setPayload}
        payload={payload}
        count={payload.page}
      />
    </div>
  );
}

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 550px;
  overflow-y: auto;
  width: calc(100% - 40px);
`;

const ProductDiv = styled.div`
  width: inherit;
  background-color: #e2e2e2;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

const Container = styled.div`
  display: flex;
`;
const LeftContainer = styled.div`
  flex: 1;
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: 500;
  &.main {
    font-size: 16px;
  }
  margin-right: 5px;
`;
const HindiTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IconWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const SendIconComponent = styled(SendIcon)`
  cursor: pointer;
`;

const Toast = styled.div`
  background-color: #f8f8f8;
  width: fit-content;
  padding: 6px;
  border-radius: 10px;
  margin: 4px 7px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatusColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  margin-right: 5px;
`;
