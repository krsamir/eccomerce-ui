import { FormComponent } from "@ecom/ui";

const EntityForm = ({ type = "create" }) => {
  const location = ["Buxar", "vaishali"];
  const createFormFields = [
    { fieldName: "Name", type: "string", required: true },
    { fieldName: "GST", type: "string", required: false },
    { fieldName: "Address", type: "string", required: true },
    {
      fieldName: "Location",
      type: "dropdown",
      options: location.map((locationCity) => ({
        label: locationCity,
        value: locationCity,
      })),
      required: true,
    },
    {
      fieldName: "Active",
      type: "checkbox",
      disabled: true,
      defaultValue: true,
    },
    { fieldName: "Deleted", type: "checkbox", defaultValue: false },
    { fieldName: "Proprietor Name", type: "string", required: true },
    {
      fieldName: "Max Admin",
      type: "number",
      defaultValue: 2,
      disabled: true,
    },
    {
      fieldName: "Max Manager",
      type: "number",
      defaultValue: 4,
      disabled: true,
    },
    {
      fieldName: "Categories",
      type: "multiselect",
      options: [
        { label: "Ten", value: "option1" },
        { label: "Twenty", value: "option2" },
      ],
      required: true,
      defaultValue: [],
    },
  ];
  const updateFormFields = [
    { fieldName: "Name", type: "string" },
    { fieldName: "GST", type: "string" },
    { fieldName: "Address", type: "string" },
    { fieldName: "Location", type: "string" },
    { fieldName: "Active", type: "checkbox" },
    { fieldName: "Deleted", type: "checkbox" },
    { fieldName: "Proprietor Name", type: "string" },
    {
      fieldName: "Max Admin",
      type: "number",
      required: true,
      defaultValue: 2,
      disabled: true,
    },
    {
      fieldName: "Max Manager",
      type: "number",
      required: true,
      defaultValue: 4,
      disabled: true,
    },
    {
      fieldName: "Categories",
      type: "dropdown",
      options: [
        { label: "Ten", value: "option1" },
        { label: "Twenty", value: "option2" },
      ],
    },
  ];

  const formFields = type == "create" ? createFormFields : updateFormFields;
  const formTitle = type == "create" ? "Create Entity" : "Update Entity";

  const onSubmit = (formData) => {
    console.log(formData, type);
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
      {FormComponent({ onSubmit, formFields, formTitle })}
    </div>
  );
};

export default EntityForm;
