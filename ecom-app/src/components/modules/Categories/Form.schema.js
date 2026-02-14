export const formSchema = [
  {
    name: "name",
    disabled: false,
    type: "text",
    label: "Name",
    rules: { required: { message: "Name cannot be blank.", value: true } },
  },
  {
    name: "parentId",
    disabled: false,
    type: "dropdown",
    label: "Parent",
    dropDownOption: [],
  },
  {
    name: "rank",
    disabled: false,
    type: "dropdown",
    label: "Rank",
    rules: { required: { message: "Rank cannot be blank.", value: true } },
  },
  {
    name: "isFavourite",
    disabled: false,
    type: "dropdown",
    label: "Show in Home Page ?",
    dropDownOption: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  },
  {
    name: "isActive",
    disabled: false,
    type: "dropdown",
    label: "is Active ?",
    dropDownOption: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  },
  {
    name: "id",
    disabled: true,
    type: "text",
    label: "ID",
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
];
