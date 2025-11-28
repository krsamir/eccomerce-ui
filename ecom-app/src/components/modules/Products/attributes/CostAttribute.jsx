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
              min_qty: "",
              max_qty: "",
              purchase_cost: "",
              cost_for_sell: "",
              actual_cost: "",
              currency: "INR",
              valid_from: "",
              valid_to: "",
              costId: "",
            })
          }
        >
          + Add
        </Button>
      </Wrapper>

      {costFields.map(({ id }, index) => (
        <Wrapper key={id}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.cost_for_sell`}
                control={control}
                rules={{
                  required: "Cost cannot be empty.",
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    placeholder="COST(SELL)"
                    {...field}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    error={Boolean(errors?.costs?.[index]?.cost_for_sell)}
                    helperText={errors?.costs?.[index]?.cost_for_sell?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.purchase_cost`}
                control={control}
                rules={{
                  required: "Purchase Cost cannot be empty.",
                }}
                render={({ field }) => (
                  <TextField
                    type="number"
                    placeholder="PURCHASE COST"
                    {...field}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    error={Boolean(errors?.costs?.[index]?.purchase_cost)}
                    helperText={errors?.costs?.[index]?.purchase_cost?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Controller
                name={`costs.${index}.actual_cost`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
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
                name={`costs.${index}.min_qty`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
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
                name={`costs.${index}.max_qty`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
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
                name={`costs.${index}.valid_from`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    placeholder="VALID FROM"
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
                name={`costs.${index}.valid_to`}
                control={control}
                render={({ field }) => (
                  <TextField
                    type="date"
                    placeholder="VALID TO"
                    {...field}
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
  padding: 20px 10px 10px 0;
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

const Title = styled.strong`
  font-size: 22px;
`;

export default CostAttribute;
