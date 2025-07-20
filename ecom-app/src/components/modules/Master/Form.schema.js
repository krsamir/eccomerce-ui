export const formSchema = [
  {
    name: "id",
    disabled: true,
    type: "text",
    label: "ID",
  },
  {
    name: "userName",
    disabled: false,
    type: "text",
    label: "User Name",
    rules: { required: { message: "User Name cannot be blank.", value: true } },
  },

  {
    name: "email",
    disabled: false,
    type: "text",
    label: "Email",
    rules: { required: { message: "Email cannot be blank.", value: true } },
  },
  {
    name: "firstName",
    disabled: false,
    type: "text",
    label: "First Name",
    rules: {
      required: { message: "First Name cannot be blank.", value: true },
    },
  },
  {
    name: "lastName",
    disabled: false,
    type: "text",
    label: "Last Name",
    rules: { required: { message: "Last Name cannot be blank.", value: true } },
  },
  {
    name: "mobile",
    disabled: false,
    type: "text",
    label: "Mobile",
    rules: {
      required: { message: "Mobile No. cannot be blank.", value: true },
    },
  },
  {
    name: "roles",
    disabled: false,
    type: "dropdown",
    label: "Roles",
    dropDownOption: [],
    rules: { required: { message: "Roles cannot be blank.", value: true } },
  },
  {
    name: "isActive",
    disabled: false,
    type: "dropdown",
    label: "Is Active Account?",
    dropDownOption: [
      { name: "Yes", value: 1 },
      { name: "No", value: 0 },
    ],
    rules: {
      required: { message: "This field cannot be blank.", value: true },
    },
  },
  {
    name: "isDeleted",
    disabled: false,
    type: "dropdown",
    label: "Is Account Deleted ?",
    dropDownOption: [
      { name: "Yes", value: 1 },
      { name: "No", value: 0 },
    ],
    rules: {
      required: { message: "This field cannot be blank.", value: true },
    },
  },
  {
    name: "token",
    disabled: true,
    type: "text",
    label: "Token",
  },
  {
    name: "validTill",
    disabled: true,
    type: "text",
    label: "Token Valid Till",
  },
  {
    name: "lastLogin",
    disabled: true,
    type: "text",
    label: "Last Login",
  },
  {
    name: "invalidLogins",
    disabled: true,
    type: "text",
    label: "Login Attempts Left",
  },
  {
    name: "createdAt",
    disabled: true,
    type: "text",
    label: "Created At",
  },
  {
    name: "updatedAt",
    disabled: true,
    type: "text",
    label: "Updated At",
  },
  {
    name: "createdByUser",
    disabled: true,
    type: "text",
    label: "Created By",
  },
];
