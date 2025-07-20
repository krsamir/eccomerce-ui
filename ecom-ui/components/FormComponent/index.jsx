import {
  Switch,
  TextField,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Checkbox,
  Typography,
  ListItemText,
} from "@mui/material";
import { Form, Controller, useForm } from "react-hook-form";
import { useCallback } from "react";

const FormComponent = ({ onSubmit, formTitle, formFields }) => {
  const { register, handleSubmit, control } = useForm();
  const getFormElement = useCallback(
    ({ type, fieldName, defaultValue, required, options, disabled, rules }) => {
      switch (type) {
        case "string":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue ?? ""}
              render={({ field }) => (
                <TextField
                  required={required}
                  disabled={disabled}
                  {...field}
                  {...register(fieldName, {
                    required: required,
                    maxLength: 20,
                  })}
                  label={fieldName}
                />
              )}
            />
          );
        case "number":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue}
              render={({ field }) => (
                <TextField
                  required={required}
                  disabled={disabled}
                  type="number"
                  {...field}
                  {...register(fieldName, {
                    required: required,
                    maxLength: 20,
                  })}
                  label={fieldName}
                />
              )}
            />
          );
        case "switch":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue ?? "true"}
              rules={rules}
              render={({ field }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "40px",
                    }}
                  >
                    <InputLabel required={required} disabled={disabled}>
                      {fieldName}
                    </InputLabel>
                    <Switch {...field} required={required} />
                  </div>
                );
              }}
            />
          );
        case "checkbox":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue ?? false}
              rules={rules}
              render={({ field }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "40px",
                    }}
                  >
                    <InputLabel required={required} disabled={disabled}>
                      {fieldName}
                    </InputLabel>
                    <Checkbox
                      {...field}
                      onChange={(e) => field.onChange(e.target.checked)}
                      required={required}
                      disabled={disabled}
                      checked={field.value}
                    />
                  </div>
                );
              }}
            />
          );
        case "dropdown":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue ?? options[0]}
              rules={rules}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel
                    id={fieldName}
                    required={required}
                    disabled={disabled}
                  >
                    {fieldName}
                  </InputLabel>
                  <Select
                    {...field}
                    required={required}
                    disabled={disabled}
                    label={fieldName}
                    labelId={fieldName}
                  >
                    {options.map((field) => {
                      return (
                        <MenuItem key={field.label} value={field.value}>
                          {field.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          );
        case "multiselect":
          return (
            <Controller
              control={control}
              name={fieldName}
              defaultValue={defaultValue ?? []}
              render={({ field }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "40px",
                    }}
                  >
                    <InputLabel required={required} disabled={disabled}>
                      {fieldName}
                    </InputLabel>

                    <Select
                      {...field}
                      multiple
                      fullWidth
                      required={required}
                      disabled={disabled}
                      defaultValue={[]}
                      value={field.value || []}
                      renderValue={(selected) =>
                        options
                          .filter((opt) => selected.includes(opt.value))
                          .map((opt) => opt.label)
                          .join(", ")
                      }
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox
                            checked={
                              field.value?.includes(option.value) || false
                            }
                          />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                );
              }}
            />
          );
      }
    },
    [control, register]
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography style={{ padding: "8px" }}>
        {formTitle.toUpperCase()}
      </Typography>
      <Grid container spacing={2}>
        {formFields?.map((field) => (
          <Grid key={field.fieldName} size={6}>
            {getFormElement(field)}
          </Grid>
        ))}
      </Grid>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
