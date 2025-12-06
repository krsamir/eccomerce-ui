import React from "react";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({ payload, setPayload, count }) {
  return (
    <Container>
      <Stack spacing={2}>
        <Pagination
          page={payload.page}
          count={Math.ceil(count / 10)}
          onChange={(_, page) => setPayload((prev) => ({ ...prev, page }))}
          variant="outlined"
          shape="rounded"
          showLastButton
        />
      </Stack>
    </Container>
  );
}

export default PaginationComponent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
