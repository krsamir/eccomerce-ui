import { Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import AutoSelect from "react-select/creatable";
import { useProducts } from "@hooks";

function StockAttributes({ form }) {
  const { metaData, isLoadingMetaData } = useProducts({
    fetchStockMetaData: true,
  });

  const {
    control,
    setValue,
    formState: { errors },
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
                  label="QUANTITY AVAILABLE"
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
                  label="REORDER LEVEL"
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
                  placeholder="SUPPLIER NAME"
                  options={metaData.supplierName}
                  onChange={field.onChange}
                  value={field.value}
                  inputValue={field.value ?? ""}
                  onCreateOption={(data) =>
                    setValue("stock.supplier_name", data, { shouldDirty: true })
                  }
                  isLoading={isLoadingMetaData}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Controller
              name="stock.source"
              control={control}
              render={({ field }) => (
                <>
                  <ReactSelect
                    className="react-select-box"
                    classNamePrefix="react-select"
                    placeholder="SOURCE"
                    options={metaData.source}
                    onInputChange={field.onChange}
                    onCreateOption={(data) =>
                      setValue("stock.source", data, { shouldDirty: true })
                    }
                    isLoading={isLoadingMetaData}
                    inputValue={field.value ?? ""}
                  />
                </>
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
    margin-bottom: 200px;
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
