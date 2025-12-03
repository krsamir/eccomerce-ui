import { Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";

function CostAttribute({ form, costsForm }) {
  const {
    control,
    formState: { errors },
    watch,
  } = form;

  const { fields: costFields, append, remove } = costsForm;

  return (
    <>
      <Wrapper className="first">
        <Title>Cost Attributes</Title>
        <Button
          variant="contained"
          sx={{ ml: "20px" }}
          onClick={() =>
            append({
              minQty: "",
              maxQty: "",
              purchaseCost: "",
              costForSell: "",
              actualCost: "",
              currency: "INR",
              validFrom: "",
              validTo: "",
              costId: "",
            })
          }
        >
          + Add
        </Button>
      </Wrapper>

      {costFields.map(({ id }, index) => (
        <Wrapper key={id} className="item">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.costForSell`}
                control={control}
                rules={{
                  required: "Cost cannot be empty.",
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="COST(SELL)"
                    placeholder="COST(SELL)"
                    {...field}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    error={Boolean(errors?.costs?.[index]?.costForSell)}
                    helperText={errors?.costs?.[index]?.costForSell?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.purchaseCost`}
                control={control}
                rules={{
                  required: "Purchase Cost cannot be empty.",
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="PURCHASE COST"
                    placeholder="PURCHASE COST"
                    {...field}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    error={Boolean(errors?.costs?.[index]?.purchaseCost)}
                    helperText={errors?.costs?.[index]?.purchaseCost?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.actualCost`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="ACTUAL COST"
                    placeholder="ACTUAL COST"
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
                name={`costs.${index}.currency`}
                control={control}
                render={({ field }) => (
                  <TextField
                    disabled
                    label="CURRENCY"
                    placeholder="CURRENCY"
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
                name={`costs.${index}.minQty`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="MINIMUM QUANTITY"
                    placeholder="MINIMUM QUANTITY"
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
                name={`costs.${index}.maxQty`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    label="MAXIMUM QUANTITY"
                    placeholder="MAXIMUM QUANTITY"
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
                name={`costs.${index}.validFrom`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    label="VALID FROM"
                    {...field}
                    value={field.value ?? ""}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.validTo`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    label="VALID TO"
                    {...field}
                    value={field.value ?? ""}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                  />
                )}
              />
            </Grid>
            {watch("costs")?.length > 1 && (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                <Button
                  variant="contained"
                  sx={{ height: "100%" }}
                  onClick={() => remove(index)}
                  fullWidth
                >
                  Remove Item
                </Button>
              </Grid>
            )}
          </Grid>
        </Wrapper>
      ))}
    </>
  );
}

const Wrapper = styled.div`
  padding: 20px 10px 20px 0;
  width: 100%;
  :last-child {
    padding-bottom: 20px;
    border-bottom: 2px inset #ededed;
  }
  &.first {
    border-bottom: 2px inset #ededed;
    margin: 20px 0;
  }
  &.item {
    border-bottom: 2px inset #ededed;
  }
`;

const Title = styled.strong`
  font-size: 22px;
`;

export default CostAttribute;
