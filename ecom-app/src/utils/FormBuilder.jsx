import React, { useCallback } from "react";
import propTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { capitalize, tranformCamelCasetoSpaceSeparated } from "@ecom/ui/utils";

const FieldType = ({ type, form, field, errors }) => {
  const checkIsError = useCallback(
    (key) => Object.keys(errors[key] ?? {})?.length > 0,
    [errors]
  );
  if (type === "text") {
    return (
      <TextField
        id={form?.name}
        label={form?.label}
        variant="filled"
        fullWidth
        disabled={form?.disabled}
        {...field}
        error={checkIsError(form?.name)}
        helperText={
          checkIsError(form?.name) &&
          `${
            form?.errorKey
              ? form?.errorKey
              : `Enter ${tranformCamelCasetoSpaceSeparated(
                  capitalize(form?.name)
                )}`
          }`
        }
      />
    );
  }
  if (type === "dropdown") {
    return (
      <FormControl fullWidth disabled={form?.disabled}>
        <InputLabel id={form?.id}>{form?.label}</InputLabel>
        <Select labelId={form?.id} id={form?.id} label={form?.label} {...field}>
          {(form.dropDownOption ?? []).map((option, i) => (
            <MenuItem value={option?.value} key={`${option?.value}-${i}`}>
              {option?.name}
            </MenuItem>
          ))}
        </Select>
        {checkIsError(form?.name) && (
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {`${
              form?.errorKey
                ? form?.errorKey
                : `Enter ${tranformCamelCasetoSpaceSeparated(
                    capitalize(form?.name)
                  )}`
            }`}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  return <div>Field type Not Available</div>;
};

function FormBuilder({ data, controller, errors }) {
  if (!Array.isArray(data)) {
    return (
      <div>
        <div>Provide data as array of objects to use Form Builder.</div> <br />
        <div>
          <pre>
            {JSON.stringify(
              [
                {
                  name: "id",
                  disabled: false,
                  type: "text",
                  label: "ID",
                  errorKey: "",
                },
              ],
              null,
              5
            )}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        {data.map((form, i) => {
          return (
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
              key={`${form?.name}-${i}`}
            >
              <Controller
                name={form?.name}
                control={controller}
                rules={{ ...form?.rules }}
                render={({ field }) => (
                  <FieldType
                    type={form?.type}
                    field={field}
                    form={form}
                    errors={errors}
                  />
                )}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default FormBuilder;

FormBuilder.propTypes = {
  data: propTypes.objectOf({
    name: propTypes.string,
    disabled: propTypes.bool,
    type: propTypes.string,
    label: propTypes.string,
    errorKey: propTypes.string,
    rules: { required: propTypes.bool },
    dropDownOption: propTypes.array,
  }),
  controller: propTypes.any,
  errors: propTypes.any,
};
