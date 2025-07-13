import {
  Switch,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm, Form, Controller } from "react-hook-form";

const EntityForm = ({ type = "create" }) => {
  const createFormFields = [
    { fieldName: "Name", type: "string", required: true },
    { fieldName: "GST", type: "string", required: true },
    { fieldName: "Address", type: "string", required: true },
    { fieldName: "Location", type: "string", required: true },
    { fieldName: "Active", type: "switch", required: true },
    { fieldName: "Deleted", type: "switch", required: true },
    { fieldName: "Proprietor Name", type: "string", required: true },
    { fieldName: "Max Admin", type: "number", required: true },
    { fieldName: "Max Manager", type: "number", required: true },
    {
      fieldName: "Categories",
      type: "dropdown",
      options: { OPTION_1: "option1", OPTION_2: "option2" },
      required: true,
      defaultValue: "option1",
    },
  ];
  const updateFormFields = [
    { fieldName: "Name", type: "string" },
    { fieldName: "GST", type: "string" },
    { fieldName: "Address", type: "string" },
    { fieldName: "Location", type: "string" },
    { fieldName: "Active", type: "switch" },
    { fieldName: "Deleted", type: "switch" },
    { fieldName: "Proprietor Name", type: "string" },
    { fieldName: "Max Admin", type: "number" },
    { fieldName: "Max Manager", type: "number" },
    {
      fieldName: "Categories",
      type: "dropdown",
      options: { OPTION_1: "option1", OPTION_2: "option2" },
    },
  ];

  const formFields = type == "create" ? createFormFields : updateFormFields;
  const formTitle = type == "create" ? "Create Entity" : "Update Entity";

  const { register, handleSubmit, control } = useForm();

  const onSubmit = (formData) => {
    console.log(formData, type);
  };

  const getFormElement = ({
    type,
    fieldName,
    defaultValue,
    required,
    options,
    disabled,
  }) => {
    switch (type) {
      case "string":
        return (
          <Controller
            control={control}
            name={fieldName}
            render={(field) => (
              <TextField
                required={required}
                disabled={disabled}
                {...field}
                {...register(fieldName, { required: required, maxLength: 20 })}
                defaultValue={defaultValue}
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
            render={(field) => (
              <TextField
                required={required}
                disabled={disabled}
                type="number"
                {...field}
                {...register(fieldName, { required: required, maxLength: 20 })}
                defaultValue={defaultValue}
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
            render={(field) => {
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
                  <Switch
                    {...field}
                    {...register(fieldName, { required: required })}
                    defaultValue={defaultValue}
                  />
                </div>
              );
            }}
          />
        );
      case "dropdown":
        console.log(fieldName, options);
        return (
          <Controller
            control={control}
            name={fieldName}
            render={(field) => (
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
                  {...register(fieldName, { required: required })}
                  label={fieldName}
                  labelId={fieldName}
                  defaultValue={defaultValue}
                >
                  {Object.entries(options).map(([key, value]) => {
                    return <MenuItem value={key}>{value}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
        );
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "#dfdfdf",
        border: "2px solid #000",
        boxShadow: 24,
        padding: "40px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: "8px" }}>{formTitle.toUpperCase()}</div>
        <Grid container spacing={2}>
          {formFields?.map((field) => (
            <Grid item size={6}>
              {getFormElement(field)}
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
};

export default EntityForm;
