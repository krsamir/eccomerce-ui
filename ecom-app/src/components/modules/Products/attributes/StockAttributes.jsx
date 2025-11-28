import { Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import { hsnsApi } from "@api";
import { useBarcodeScan } from "@hooks";
import { useGlobalContext } from "@store";
import AutoSelect from "react-select/creatable";

function StockAttributes({ form }) {
  const { state: { units } = {} } = useGlobalContext();

  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = form;

  return (
    <>
      <Wrapper className="first">
        <Title>Stock Attributes</Title>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Controller
              name="stock.quantity_available"
              control={control}
              rules={{
                required: "Quantity Available cannot be empty.",
              }}
              render={({ field }) => (
                <TextField
                  placeholder="QUANTITY AVAILABLE"
                  type="number"
                  {...field}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  error={Boolean(errors?.stock?.quantity_available)}
                  helperText={errors?.stock?.quantity_available?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Controller
              name="stock.reorder_level"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  placeholder="REORDER LEVEL"
                  {...field}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Controller
              name="stock.supplier_name"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="react-select-box"
                  classNamePrefix="react-select"
                  placeholder="CUSTOMER"
                  options={[]}
                  onChange={field.onChange}
                  value={field.value}
                  // onCreateOption={(data) => console.info(data)}
                  // isLoading={isLoadingCustomer}
                  // isDisabled={isPaymentDone || isInvoiceSaved}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Controller
              name="stock.source"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  className="react-select-box"
                  classNamePrefix="react-select"
                  placeholder="SOURCE"
                  options={[]}
                  onChange={field.onChange}
                  value={field.value}
                  // onCreateOption={(data) => console.info(data)}
                  // isLoading={isLoadingCustomer}
                  // isDisabled={isPaymentDone || isInvoiceSaved}
                />
              )}
            />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 10px 10px 10px 0;
  width: 100%;
  :last-child {
    padding-bottom: 20px;
    border-bottom: 2px inset #ededed;
  }
  &.first {
    border-bottom: 2px inset #ededed;
    margin: 20px 0;
  }
`;

const ReactSelect = styled(AutoSelect)`
  .react-select__menu {
    z-index: 700 !important;
  }
  .react-select__control {
    height: 58px !important;
  }
`;

const Title = styled.strong`
  font-size: 22px;
`;

export default StockAttributes;
